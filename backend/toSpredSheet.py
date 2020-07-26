import gspread
import json
import os
from os.path import join, dirname
from dotenv import load_dotenv

# ServiceAccountCredentials：Googleの各サービスへアクセスできるservice変数を生成します。
from oauth2client.service_account import ServiceAccountCredentials 

# envの設定
load_dotenv(verbose=True)
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

# 2つのAPIを記述しないとリフレッシュトークンを3600秒毎に発行し続けなければならない
scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']

# 認証情報設定
# ダウンロードしたjsonファイル名をクレデンシャル変数に設定
credentials = ServiceAccountCredentials.from_json_keyfile_name('spreadsheet-test-284506-268d2cf2c51b.json', scope)

# OAuth2の資格情報を使用してGoogle APIにログインします。
gc = gspread.authorize(credentials)

# 共有設定したスプレッドシートキーを変数[SPREADSHEET_KEY]に格納する。
SPREADSHEET_KEY = os.environ.get("SPREADSHEET_KEY")

# 共有設定したスプレッドシートのシート1を開く
worksheet = gc.open_by_key(SPREADSHEET_KEY).sheet1

# A1セルの値を受け取る
import_value = worksheet.acell('A1').value

# A1セルの値に100加算した値をB1セルに表示させる
export_value = import_value+'足しました'
worksheet.update_cell(1,2, export_value)

# wordファイル作成

# document = Document()
# document.add_paragraph('Hello World!')
# document.save('python-docs-test.docx')