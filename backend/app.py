from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

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
        return jsonify({'message': 'Arquivos recebidos com sucesso',
                        'pdf_filename': pdf_filename,
                        'csv_filename': csv_filename}), 200
    else:
        return jsonify({'error': 'Tipos de arquivo não permitidos'}), 400

if __name__ == '__main__':
    app.run(debug=True)
