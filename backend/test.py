import sys
from docx import Document

data = sys.stdin.readline()
print(data)

document = Document()
document.add_paragraph(data)
document.save('python-docs-test.docx')