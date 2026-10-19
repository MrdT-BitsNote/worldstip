# -*- coding: utf-8 -*-
import io,sys
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
s=io.open('index.html',encoding='utf-8').read()
i=s.find('<div class="deck"')
i=s.find('<div class="deck"')
print('DECK START:', i)
print(s[i-200:i+220])
print('...')
j=s.find('</div>\n\n  <p class="foot-note"')
print('DECK END area:')
print(s[j-120:j+80])
print('SCRIPT idx:', s.find('<script'))
