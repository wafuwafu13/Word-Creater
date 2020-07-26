import MySQLdb
from docx import Document
from dotenv import load_dotenv
import os
from os.path import join, dirname

# envの設定
load_dotenv(verbose=True)
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

con = MySQLdb.connect(
    host = os.environ.get("DB_HOST"),
    user = os.environ.get("DB_USER"),
    passwd = os.environ.get("DB_PASSWORD"),
    db = os.environ.get("DB_NAME"),
)

cur = con.cursor()
sql = "select text from documents where id = %s"
cur.execute(sql, (1,))

rows = cur.fetchall()

document = Document()
document.add_paragraph(rows[0][0])
document.save('python-docs-test.docx')