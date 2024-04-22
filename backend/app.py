from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

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
            "content": "Definir o âmbito de aplicação do artigo 112 da Lei 8.213/91; Definir se o artigo 112 da Lei 8.213/91 versa sobre hipótese de sucessão processual, na forma do artigo 110 do CPC (\"Art. 110. Ocorrendo a morte de qualquer das partes, dar-se-á a sucessão pelo seu espólio ou pelos seus sucessores, observado o disposto no art. 313, §§ 1º e 2º\"); Não sendo hipótese de sucessão processual: a) definir se os pensionistas possuem direito de pleitear, em nome próprio, valores não recebidos em vida pelo falecido segurado; b) definir se, na ausência dos pensionistas, os herdeiros e/ou espólio possuem direito de pleitear, em nome próprio, parcelas não recebidas em vida pelo falecido segurado; Definir em que consiste \"o valor não recebido em vida pelo segurado\" mencionado no artigo 112 da Lei 8.213/91, isto é, se se tratam de importâncias não recebidas em vida pelo de cujus, mas já integradas ao seu patrimônio (por exemplo: indeferimento de requerimento administrativo de concessão/revisão de benefício e cancelamento indevido de benefício) ou simplesmente qualquer pagamento a menor relativo ao benefício previdenciário do falecido e que não foi reclamado administrativa ou judicialmente por ele em vida.",
            "id": 1,
            "likeliness": 65
            },
            {
            "content": "Definir o âmbito de aplicação do artigo 112 da Lei 8.213/91;  Definir se o artigo 112 da Lei 8.213/91 versa sobre hipótese de sucessão processual, na forma do artigo 110 do CPC (\"Art. 110. Ocorrendo a morte de qualquer das partes, dar-se-á a sucessão pelo seu espólio ou pelos seus sucessores, observado o disposto no art. 313, §§ 1º e 2º\");  Não sendo hipótese de sucessão processual: a) definir se os pensionistas possuem direito de pleitear, em nome próprio, valores não recebidos em vida pelo falecido segurado; b) definir se, na ausência dos pensionistas, os herdeiros e/ou espólio possuem direito de pleitear, em nome próprio, parcelas não recebidas em vida pelo falecido segurado;  Definir em que consiste \"o valor não recebido em vida pelo segurado\" mencionado no artigo 112 da Lei 8.213/91, isto é, se se tratam de importâncias não recebidas em vida pelo de cujus, mas já integradas ao seu patrimônio (por exemplo: indeferimento de requerimento administrativo de concessão/revisão de benefício e cancelamento indevido de benefício) ou simplesmente qualquer pagamento a menor relativo ao benefício previdenciário do falecido e que não foi reclamado administrativa ou judicialmente por ele em vida.",
            "id": 2,
            "likeliness": 90
            }
        ]
        return jsonify(data), 200
    else:
        return jsonify({'error': 'Tipos de arquivo não permitidos'}), 400

if __name__ == '__main__':
    app.run(debug=True)
