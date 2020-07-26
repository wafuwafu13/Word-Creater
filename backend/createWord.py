from docx import Document

document = Document()
document.add_paragraph('Hello World!')
document.save('python-docs-test.docx')