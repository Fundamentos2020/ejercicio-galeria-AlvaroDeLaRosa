var p=1;
var numPags=0;
var actualPage=1;
var n=0;

document.querySelector('#search').addEventListener('submit', busqueda);

function busqueda(e) {
    e.preventDefault();
    n=document.getElementById('barr').value;
    numPags=Math.floor(100/n);
    if(n!=='') {
        creaMenu();
        changePage(1);
    }
}

function creaMenu() {
    var x;
    const menu=document.getElementById('pages');
    let cuadritos='';
    cuadritos+=`
        <input type="submit" class="page" id="last" value="<<"  onclick="antPage()">
    `;
    for(x=0;x<numPags;x++) {
        cuadritos+=`
            <input type="submit" class="page" value="${x+1}" id="p${x+1}" onclick="changePage(this.value)">
        `;
    }
    cuadritos+=`
        <input type="submit" class="page" id="next" value=">>" onclick="sigPage()">
    `;
    document.getElementById('pages').innerHTML=cuadritos;
}

function sigPage() {
    if(actualPage<numPags) {
        changePage(actualPage+1);
    }
}

function antPage() {
    if(actualPage>1) {
        changePage(actualPage-1);
    }
}

function changePage(num) {
    var b=document.getElementById('p'+actualPage);
    b.className="page";
    var np=document.getElementById('p'+num);
    np.className="page2";
    actualPage=num;
    let url='';
    url+='https://picsum.photos/v2/list?page='+num+'&limit='+n;
    xhr=new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload=function() {
        if(this.status===200) {
            //console.log(JSON.parse(this.responseText));
            const images=JSON.parse(this.responseText);
            let inyect='';
            images.forEach(function(elem) {
                inyect+=`
                    <div class="col-m_2p5 col_12">
                        <img src="https://picsum.photos/id/${elem.id}/250/150" class"image">
                    </div>
                `;
            })
            document.getElementById('cont').innerHTML=inyect;
        }
    }
    xhr.send();
}