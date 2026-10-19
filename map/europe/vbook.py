# -*- coding: utf-8 -*-
import io,sys,http.client,re
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
c=http.client.HTTPConnection('127.0.0.1',8936,timeout=8); c.request('GET','/europe/index.html'); r=c.getresponse(); raw=r.read(); c.close()
txt=raw.decode('utf-8','ignore')
print('HTTP', r.status, len(raw))
keys=['view-toggle','data-view="book"','data-view="list"','book-mode','bbPrev','bbNext','bbPg','bbFill','touchstart','ArrowRight','BOOK={','applyView(\'book\')']
for k in keys: 
    if k not in txt: print('  MISS', k)
print('has pause anim:', txt.count('animating'))
print('cards:', txt.count('<article class="card'))
print('chips:', len(re.findall(r'data-target="c-',txt)))
