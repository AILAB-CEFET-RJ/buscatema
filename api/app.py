from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os


app = Flask(__name__)
CORS(app)

# Definição de extensões permitidas
ALLOWED_EXTENSIONS = {'csv'}

def allowed_file(filename):
    """Verifica se o arquivo é permitido com base em sua extensão."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # Verifica se os arquivos CSV1 e CSV2 foram enviados na requisição
    if 'csv1' not in request.files or 'csv2' not in request.files:
        return jsonify({'error': 'Arquivos não encontrados'}), 400

    csv1_file = request.files['csv1']
    csv2_file = request.files['csv2']

    # Verifica se os arquivos têm nome
    if csv1_file.filename == '' or csv2_file.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400

    # Verifica se os arquivos são permitidos
    if csv1_file and allowed_file(csv1_file.filename) and csv2_file and allowed_file(csv2_file.filename):
        csv1_filename = secure_filename(csv1_file.filename)
        csv2_filename = secure_filename(csv2_file.filename)
        
        # Salvar os arquivos diretamente no diretório atual
        csv1_file.save(csv1_filename)
        csv2_file.save(csv2_filename)
        print(f"Arquivos salvos: {csv1_filename} e {csv2_filename}")

        # Comando para executar o script sugereTema.py com os arquivos como argumento
        command = f'python sugereTema.py {csv1_filename} {csv2_filename}'
        try:
            print(f"Executando comando: {command}")
            # Executa o comando usando os.system()
            exit_code = os.system(command)
            if exit_code != 0:
                return jsonify({'error': 'Erro ao executar comando', 'details': f"Código de saída: {exit_code}"}), 500
            else:
                print(f"Comando executado com sucesso.")
        except Exception as e:
            print(f"Erro na execução do comando: {str(e)}")
            return jsonify({'error': 'Erro ao executar comando', 'details': str(e)}), 500

        # Retornar resposta de sucesso
        return jsonify({'message': 'Comando executado com sucesso'}), 200
    else:
        return jsonify({'error': 'Tipos de arquivo não permitidos'}), 400

if __name__ == '__main__':
    app.run(debug=True)
