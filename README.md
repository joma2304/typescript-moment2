
# Min lösning
* Jag gjorde tre st typescript filer, en med ett interface för min todolist som jag sedan importerade i min classfil. I min classfil har jag mitt attribut todos som följer mitt interface. Sedan har jag en konstruktor som laddar in det som är lagrat i localstorage och ger dem attributet todos. Jag har metoder för att: Lägga till uppgifter, ta bort uppgifter, markera uppgifter som klara, få listan med uppgifter, spara till localstorage och ladda från localstorage. 

* Sedan har jag en main fil som importerar min class-fil. I den så gör jag all dom-manupulation för att läsa ut själva innehållet till min webbplats. Det är denna filen som är länkad i min HTML-kod. 

* Jag använder mig av parcel för att automatisera och för att transpilera TypeScript koden till JavaScript så att den kan köras i webbläsaren. 