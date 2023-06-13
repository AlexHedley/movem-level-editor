// 
const typesArray = [
    { name: 'Wall', image: 'Wall.png', value: 'W' },
    { name: 'Background', image: 'Background.png', value: 'B' },
    { name: 'Player', image: 'Man_Down.png', value: 'P' },
    { name: 'Goal', image: 'Goal.png', value: 'G' },
]

$(()=>{

    const createImage = (type = 'B') => {
        const x = document.createElement("img");
        
        const imageForType = typesArray.find(x => x.value === type);

        if (!imageForType) {
            console.error("No image found for type", type);
            return;
        }
        
        x.setAttribute("src", `images/tiles/${imageForType.image}`);
        x.setAttribute("height", "32");
        x.setAttribute("width", "32");
        x.setAttribute("alt", type);
        return x;
    }

    $(".grid").on('click', 'div', function (event) {
        
        const $this = $(this);
        const isSelected = $this.hasClass('selected');

        console.log("isSelected", isSelected);

        if (!isSelected) {
            const choice = getChoice();
            const image = createImage(choice.toUpperCase());
            $this.addClass('selected');
            $this.append(image);
            $this.data('choice', choice);
            return;
        }

        $this.removeClass('selected');
        $this.data('choice', '');
        $this.empty();

        //this.innerHTML = getChoice();
    });

});

function create() {
    $('.grid').empty();
    createGrids();
    getChoice();
}

function createGrids() {
    var cols = $('#cols').val();
    var rows = $('#rows').val();
    var divCount = cols * rows;
    
    for (let i = 1; i <= divCount; i++) {
        var divElement = document.createElement("div");
        // var background = createImage();
        // divElement.append(background);
        $(".grid").append(divElement);
    }

    setStyle();
}



function setStyle() {
    var style = buildStlye();
    $('.grid').attr('style', style);
}

function buildStlye() {
    var cols = $('#cols').val();
    var rows = $('#rows').val();
    var gap = $('#gap').val();
    return "row-gap: " + gap + ";column-gap: " + gap + ";grid-template-columns: repeat(" + cols + ", 1fr);grid-template-rows: repeat(" + rows + ", 1fr);"
}

function getChoice() {
    return $("input[name='choice']:checked").val();
}

// ----- ----- ----- -----

function build() {
    var items = '';
    $('.grid div').each(function(e) {
        const $this = $(this);
        const choice = $this.data('choice');
        
        if (!choice) {
            items += ' ';
        } else {
            items += choice;
        }
        
    });

    // https://stackoverflow.com/a/58138244/2895831
    var row = $('#rows').val(); // Known at run time
    var col = $('#cols').val(); // Known at run time
    var i = 0;
    
    var array2D = [[]];
    for(var r = 0; r < row; ++r)
    {
        array2D[r] = [];
        for(var c = 0; c < col; ++c)
        {
            array2D[r][c] = items[i++];
        }
    }

    // console.log(array2D);
    
    const levelAsJSON = JSON.stringify(array2D);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(levelAsJSON);
    // console.log("Data String", dataStr);

    // https://stackoverflow.com/a/30800715/2895831
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "level.json");
    dlAnchorElem.click();
}