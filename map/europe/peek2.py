# -*- coding: utf-8 -*-
import io,sys
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
s=io.open('index.html',encoding='utf-8').read()
last=s.rfind('<script')
print('LAST <script> at:', last)
print(s[last:last+1800])
