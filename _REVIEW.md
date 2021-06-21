# 29.4 
[x]Matija zistit od Reneho ci ma uzatvorene tieto tasky pripadne od Mateja 
	- matija: rene hovori, ze su to done tasky, tak ich uzatvaram cez - aby ich nehladalo v search

# 25.2. z-comments
[-]Rene Naco sa posiela do z-comment modelId ?
[_] Refactornut na rekurzivnost (aby podporovalo hocikolko vnoreni kommentov), cize replies preniest do vnutra z-comment
	- tym padom aj addReply bude iba raz v celkom
# 25.2. z-comment
[-]Rene Pridat confirmation popup na remove comment - confirm()
[-]Rene Zmenit zapis datumu na slovensky format (24.2.2021)
[-]Rene Avatar dat cez computed (rozpoznavanie ci je nastaveny alebo pouzijeme defaultny)
[-]Rene Upratat isEditEnabled()
[-]Rene Vyhodit isReply a namiesto toho nastavovat allowReplies







# 19.2. Glasnak
[] Upravit mocky podla api (poslal som ti realny json z api do chatu)
	- MG: Menilo sa comment.replies -> comment.answers a comment.text -> comment.content
[] Psycho: Nehceme clearovat toast pred vyhodenim noveho toastu? Aby sa nezbierali hore? Lebo ked vykonas vela akcii tak sa ti to dost zaspamuje

# Poznaky pre reneho
- Nemal si handlovanie usecaseu ak uzivatel nema nastavenu fotku. Pozri ako som to spravil

- v z-comment _isEditEnabled nemozes zakomentovat posledny riadok a vracat vzdy true (uz som ho odkomentoval). Keby sa vracalo vzdy true tak by mohol hocikto posielat na api edit/delete request na akykolvek comment

- v z-comment addReply() sa musi v prvom radse skusit posielat this.commentId (toto si preposielame ako prop ak renderujeme reply), ak nieje this.commentId tak posielame this.comment.id (toto nastava ak renderujeme hlavny comment) `await api.addReply(this.commentId || this.comment.id, this.addReplyText)`

- nastavil som velkost avatara (50px x 50px)

- po submitnuti noveho commentu som pridal loadComments() aby sme refreshli commenty a vyrenderovali ten co sme prave pridali


# ------------

# 16.2. Api
[] ! Zapracovat nove api
	- Pali to pisal v channeli, precitat aj thready k tomu






# 10.2. z-comments
[x] ! ma to byt w@feature/comments
[] ! nemozu tam byt globalne styly s neprefixovanymi classmi
	- MG: Co si myslel pod globalnymi stylmi? _ui zlozku ktoru som teraz v priebehu refactoringu zmazal?
[x] ! nazvy componentov by mali byt prefixovany hlavnym, cize z-comments-reply, z-comments-reply-form
[x] isLoggedIn cez mapper
[x] ! stale neni event emit cez komponenty?
[x] ! na toto si spravme funkciu ktora dostane comment, a vyhodnoti to, nerobme to dopredu, spati to kod
    - "comment._isEditEnabled = comment.author.id == this.user.id || this.user.groups.includes('admin')"


# 10.2. z-comment
[x] mappre na user a logged in
    [] inak nemozme kua dat user a logged in do this.$auth? globalne?
[] preco treba "$forceUpdate"? zrusme to alebo tam rozpisme myslienkovy proces ako sa doslo k tomu ze je to jedina mozna cesta

[x] ! preco sa importuje externe scss do vue komponentu? dajme tie styly dnu
    [-] a preco sa rovnake styly nachadzaju v dvoch veciach?
		- MG: vyriesilo sa to spojenim reply a comment
    [-] aky je vobec rozdiel medzi comment a reply?
		- MG: Tam som to rozdelil iba kvoli prehladnosti, ale poupravoval som to teraz a je to prehladne aj ked je to spojene
[x] ! reply uplne vydrbat, a spravit comment is-reply=true

# 10.2. z-reply-form
[x] zrusit globalne eventy



# 9.2. Glasnak
[x] Edit... iba ak je autor/admin

# 1.2. Glasnak
[☑] pullni si zmeny z shared-dev, lebo tato brancha je dost zastarana. Uz je aj zapnuta kontrola odsadeni aby boli taby atd, takze som 10min zarovnaval veci aby to islo skompilovat
[☑] v img mas prazdny alt, vyhod ho
[☑] pouzit bootstrap buttony (pozri v appke njeake b-button, napriklad v w@user plugine)
[☑] meno a datum by som dal z vrchu zarovnane s fotkou
[☑] nemusis pouzivat mapGetters, tu sa to zabehu nezmeni. Staci $store.getters['wAuth/isLoggedIn'] alebo ako to je
[☑] props by si mohol viac rozpisat, kedze je to tak vsade v appke
[] textareau pouzi tak ako sa pouziva vo w@user, uz je globalne aj nastylovana
[☑] pouzil by som cele nazvy (msg-body -> message-body) pre konzistentnost so zvyskom kodu
[☑] pred {} davaj medzer (data() {})



# 29.1
[☑] editComment na editMode
[☑] do slovenciny s diakritikou
[☑] pouzit bootstrap
[☑] doriesit routes


# 28.1
[🖾] Spravit configurovatelny title !!Nedava zmysel
[☑] Userid z auth storu
[☑] getByprojectId na _load
[☑] presunut created a mouted
[☑] zmenit root na emit !!Furt mi to jebe undefined

# 26.1
[☑] Premenovať všetky vnorené komponenty pod z comments"
    [☑] z-comment-reply
    [☑] z-comment-new
    [☑] z-comments
    [☑] z-comment

[☑] Urobiť mocky
[☑] moment
[☑] Premenovať reply na (odstrániť)