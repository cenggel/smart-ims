{"allowcache":true,
"splitmode":"0",
"path.pdf":"d:\\docs\\pdf\\",
"path.swf":"d:\\docs\\swf\\",
"renderingorder.primary":"flash",
"renderingorder.secondary":"html",
"cmd.conversion.singledoc":"\"d:\\SWFTools\\pdf2swf.exe\" {path.pdf}{pdffile} -o {path.swf}{pdffile}.swf -f -T 9 -t -s storeallcharacters -s linknameurl",
"cmd.conversion.splitpages":"\"d:\\SWFTools\\pdf2swf.exe\" {path.pdf}{pdffile} -o {path.swf}{pdffile}_%.swf -f -T 9 -t -s storeallcharacters -s linknameurl",
"cmd.conversion.renderpage":"\"d:\\SWFTools\\swfrender.exe\" {path.swf}{swffile} -p {page} -o {path.swf}{pdffile}_{page}.png -X 1024 -s keepaspectratio",
"cmd.conversion.rendersplitpage":"\"d:\\SWFTools\\swfrender.exe\" {path.swf}{swffile} -o {path.swf}{pdffile}_{page}.png -X 1024 -s keepaspectratio",
"cmd.conversion.jsonfile":"\"C:\\Program Files (x86)\\PDF2JSON\\pdf2json.exe\" {path.pdf}{pdffile} -enc UTF-8 -compress {path.swf}{pdffile}.js",
"cmd.conversion.splitjsonfile":"pdf2json.exe {path.pdf}{pdffile} -enc UTF-8 -compress -split 10 {path.swf}{pdffile}_%.js",
"cmd.searching.extracttext":"\"d:\\SWFTools\\swfstrings.exe\" {swffile}",
"cmd.query.swfwidth":"swfdump.exe {swffile} -X",
"cmd.query.swfheight":"swfdump.exe {swffile} -Y",
"pdf2swf":false,
"admin.username":"admin",
"admin.password":"admin",
"licensekey":""}