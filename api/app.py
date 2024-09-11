from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import csv
import fitz
from threading import Lock

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'pdf'}

lock = Lock()

def allowed_file(filename):
    """Verifica se o arquivo é permitido com base em sua extensão."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def pdf_to_csv(pdf_filename, num_tema):
    document = fitz.open(pdf_filename)
    text = []

    for page_num in range(len(document)):
        page = document.load_page(page_num)
        text.append(page.get_text())

    text = "\n".join(text)

    csv_filename = pdf_filename.replace('.pdf', '.csv')

    with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['recurso', 'num_tema_cadastrado'])
        writer.writerow([text, num_tema])

    return csv_filename

def read_progress():
    with lock:
        with open('progress.txt', 'r') as file:
            progress_str = file.readline().strip()
            progress = int(progress_str)

        return progress

def update_progress(new_value):
    with lock:
        with open('progress.txt', 'w') as file:
            file.write(f'{new_value}')

@app.route('/upload', methods=['POST'])
def upload_file():
    update_progress(0)
                                   
    if 'pdf' not in request.files:
        return jsonify({'error': 'Arquivo não encontrado'}), 400
    
    if 'num_tema' not in request.form:
        return jsonify({'error': 'Número do tema não encontrado'}), 400

    pdf_file = request.files['pdf']
    num_tema = request.form['num_tema']

    if pdf_file.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400

    if pdf_file and allowed_file(pdf_file.filename):
        update_progress(10)
        pdf_filename = secure_filename(pdf_file.filename)
        pdf_file.save(pdf_filename)
        print(f"Arquivo salvo: {pdf_filename}")

        csv_filename = pdf_to_csv(pdf_filename, num_tema)

        command = f'python sugereTema.py {csv_filename} lista_temas.csv'
        try:
            print(f"Executando comando: {command}")
    
            exit_code = os.system(command)
            if exit_code != 0:
                return jsonify({'error': 'Erro ao executar comando', 'details': f"Código de saída: {exit_code}"}), 500
            else:
                print(f"Comando executado com sucesso.")
        except Exception as e:
            print(f"Erro na execução do comando: {str(e)}")
            return jsonify({'error': 'Erro ao executar comando', 'details': str(e)}), 500

        with open('CLASSFIED_TOPICS_X15CLEAN_BM25.csv', mode='r', encoding='utf-8') as resultado_csv:
            update_progress(90)
            csv_reader = csv.reader(resultado_csv)
            next(csv_reader)
            resultado = next(csv_reader)

        response = [
            { 'id': resultado[2], 'similaridade': round(float(resultado[3]), 2) },
            { 'id': resultado[4], 'similaridade': round(float(resultado[5]), 2) },
            { 'id': resultado[6], 'similaridade': round(float(resultado[7]), 2) },
            { 'id': resultado[8], 'similaridade': round(float(resultado[9]), 2) },
            { 'id': resultado[10], 'similaridade': round(float(resultado[11]), 2) },
            { 'id': resultado[12], 'similaridade': round(float(resultado[13]), 2) }
        ]

        update_progress(100)

        return jsonify({
            'message': 'Comando executado com sucesso',
            'result': response
        }), 200
    else:
        return jsonify({'error': 'Tipos de arquivo não permitidos'}), 400

@app.route('/upload/progress', methods=['GET'])
def get_upload_progress():
    progress = read_progress()
    return jsonify({'progress': progress}), 200

if __name__ == '__main__':
    app.run(debug=True)
