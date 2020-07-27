import MySQLdb
from docx import Document
from dotenv import load_dotenv
import os
from os.path import join, dirname
import sys

# envの設定
load_dotenv(verbose=True)
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

filename = sys.stdin.readline()
print('filename =>', filename.strip())

con = MySQLdb.connect(
    host = os.environ.get("DB_HOST"),
    user = os.environ.get("DB_USER"),
    passwd = os.environ.get("DB_PASSWORD"),
    db = os.environ.get("DB_NAME"),
)

cur = con.cursor()
sql = "select text from documents where name = %s"
cur.execute(sql, (filename.strip(),))

rows = cur.fetchall()

document = Document()
print('text =>', rows[0][0])
text = rows[0][0]
document.add_paragraph(text)
document.save(filename.strip()+'.docx')

print('success')