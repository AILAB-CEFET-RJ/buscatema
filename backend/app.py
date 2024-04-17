from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)
CORS(app)

# Configure a pasta de uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'csv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    if 'pdf' not in request.files or 'csv' not in request.files:
        return jsonify({'error': 'Arquivos não encontrados'}), 400

    pdf_file = request.files['pdf']
    csv_file = request.files['csv']

    if pdf_file.filename == '' or csv_file.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400

    if pdf_file and allowed_file(pdf_file.filename) and csv_file and allowed_file(csv_file.filename):
        # Salvar os arquivos na pasta de uploads
        pdf_filename = secure_filename(pdf_file.filename)
        csv_filename = secure_filename(csv_file.filename)
        pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], pdf_filename)
        csv_path = os.path.join(app.config['UPLOAD_FOLDER'], csv_filename)
        pdf_file.save(pdf_path)
        csv_file.save(csv_path)
        # Retornar uma resposta ao frontend
        data = [
            {
                "content": "Definir se é possível ao magistrado fixar critérios objetivos para a análise, na forma do art. 99, §2º, do CPC, dos pressupostos necessários à concessão de justiça gratuita, ou se o exame deve ser feito com base no cotejo dos elementos concretos trazidos aos autos; E, caso seja possível a utilização de critérios objetivos no exame da hipossuficiência, se a Resolução nº 85/2014 do Conselho Superior da Defensoria Pública da União, que adota a renda mensal de 03 salários mínimos como limite máximo apto a gerar presunção de pessoa economicamente necessitada, é parâmetro idôneo a ser utilizado.",
                "id": 7,
                "likeliness": 70
            }
        ]
        return json.dumps(data), 200
    else:
        return jsonify({'error': 'Tipos de arquivo não permitidos'}), 400

if __name__ == '__main__':
    app.run(debug=True)
