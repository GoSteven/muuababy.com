//var hint = new Array(1,1,1,1,2,1,1,1,1,2,1,2,3,3,4,5,4,3,3,2,4,2,3,5,5,7,8,7,5,5,3,6,3,3,5,5,8,9,8,5,5,3,6,3,3,4,3,6,7,6,3,4,4,7,4,2,2,1,3,4,3,1,2,3,5,3,1,1,0,1,1,1,0,1,2,3,2);
//var row = 7;
var hint = new Array(
    1,2,2,1,0,1,2,2,1,1,1,1,1,1,1,0,0,0,0,1,2,3,2,1,1,1,1,0,1,1,2,2,3,3,3,2,1,1,1,1,0,1,1,1,2,3,4,2,2,2,4,3,2,2,2,2,2,2,2,0,0,0,1,2,3,3,3,2,3,2,2,0,2,2,4,3,4,3,3,2,1,2,2,2,0,2,2,2,3,4,5,3,3,3,5,4,3,3,3,3,3,3,3,0,0,0,2,3,4,3,4,3,4,3,3,2,3,3,5,5,7,6,6,4,2,3,3,3,0,3,3,3,3,3,4,3,4,3,4,3,3,3,3,3,3,3,3,0,0,0,3,3,3,0,3,3,4,3,3,4,3,3,4,4,5,3,3,2,1,3,3,3,0,3,3,3,3,3,3,2,2,2,3,3,3,3,3,3,3,4,5,3,3,2,3,3,4,3,4,3,2,2,3,5,3,2,3,5,7,6,6,4,2,2,3,4,3,4,3,2,2,2,2,1,1,1,2,2,2,2,2,2,2,3,4,3,3,2,2,2,3,3,3,2,1,1,2,3,2,1,2,3,4,3,3,2,1,1,2,3,3,3,2,1,1,1,1,0,0,0,1,1,1,1,1,1,1,2,3,3,3,2,1,1,2,3,2,1,0,0,1,1,1,0,1,2,3,3,3,2,1,0,1,2,3,2,1,0
);
var row = 7;
var col = hint.length / row

function getTd(id)
{
    return document.getElementById("td" + id.toString());
}

function init()
{
    for (i=0; i<row; i++)
    {
        var newTr = document.createElement("tr");
        for (j=0; j<col; j++)
        {
            var newTd = document.createElement("td");
            newTd.id = "td" + (i*col+j).toString();
            newTd.style.border = "1px solid black";
            newTd.style.height = "20px";
            newTd.style.width = "20px";
            newTd.style.cursor = "default";
            newTd.style.textAlign = "center";
            newTd.style.color = "#676767";
            newTd.style.fontWeight = "normal";
            newTd.onclick = function(){flip(this)};
            newTd.bgColor = "#e5e5e5";
            newTd.innerHTML = hint[i*col+j].toString();
            newTr.appendChild(newTd);
        }
        document.getElementById("board").appendChild(newTr);
    }
    check();
}

function flip(el)
{
    if (el.bgColor == "#e5e5e5")
        el.bgColor = "#ff628c";
    else
        el.bgColor = "#e5e5e5";
    check();
}
function check()
{
    var winFlag = true;
    for (i=0; i<row; i++)
    {
        for (j=0; j<col; j++)
        {
            if (matchHint(i*col+j))
            {
                getTd(i*col+j).style.color = "black";
                getTd(i*col+j).style.fontWeight = "bold";
            }
            else
            {
                getTd(i*col+j).style.color = "#676767";
                getTd(i*col+j).style.fontWeight = "normal";
                winFlag = false;
            }
        }
    }
    if (winFlag)
        document.getElementById("iloveyou").innerHTML = "HAPPY ANNIVERSARY！";
    else
        document.getElementById("iloveyou").innerHTML = "&nbsp;";
}

function matchHint(id)
{
    var toCheck = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1);
    var colorCount = 0;
    if (id < col) {toCheck[0] = 0; toCheck[1] = 0; toCheck[2] = 0; }
    if (id > hint.length - col -1) {toCheck[6] = 0; toCheck[7] = 0; toCheck[8] = 0; }
    if (id % col == 0) {toCheck[0] = 0; toCheck[3] = 0; toCheck[6] = 0; }
    if (id % col == col-1) {toCheck[2] = 0; toCheck[5] = 0; toCheck[8] = 0; }
    if ((toCheck[0] == 1) && (getTd(id-col-1).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[1] == 1) && (getTd(id-col).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[2] == 1) && (getTd(id-col+1).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[3] == 1) && (getTd(id-1).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[4] == 1) && (getTd(id).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[5] == 1) && (getTd(id+1).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[6] == 1) && (getTd(id+col-1).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[7] == 1) && (getTd(id+col).bgColor == "#ff628c")) colorCount++;
    if ((toCheck[8] == 1) && (getTd(id+col+1).bgColor == "#ff628c")) colorCount++;
    if (colorCount == hint[id])
        return true;
    else
        return false;
}

init();