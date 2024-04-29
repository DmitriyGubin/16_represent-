
/******мобильное меню*******/
var mobile_burger = document.querySelector(".mobile-burger");
var mobile_menu = document.querySelector("header .for-mobile");
var mobile_shade = document.querySelector("header .mobile_shade");
var body = document.querySelector("body");

mobile_burger.addEventListener('click', Toggle_Mobile_Menu);
mobile_shade.addEventListener('click', Toggle_Mobile_Menu);

function Toggle_Mobile_Menu()
{
	mobile_menu.classList.toggle('active');
	body.classList.toggle('overflow');
	$(mobile_shade).fadeToggle(300);
}
/******мобильное меню*******/


/********скроллинг*********/

Scroll_to_elements('.smoth_link');

function Scroll_to_elements(selector)
{
	var smoothLinks = document.querySelectorAll(selector);

	for (let item of smoothLinks)
	{
		item.addEventListener('click', function (e) 
	    {
	    	if(mobile_menu.classList.contains('active'))
	    	{
	    		Toggle_Mobile_Menu();
	    	}
	    	
	        e.preventDefault();
	        var id = item.getAttribute('href');

	        document.querySelector(id).scrollIntoView({
	            behavior: 'smooth',
	            block: 'start'
	        });
	    });
	}
}

/********скроллинг*********/

$(".phone").mask("+7(999) 999-9999");


/************карта**********/
var ofice_x = 55.063854;
var ofice_y = 82.930293;
var addres = 'ул. Танковая 6';

var delta_x = 0;
var delta_y = 0;
if(screen.width > 750)
{
	delta_y = 0.01;
}
else
{
	delta_x = 0.003;
}

ymaps.ready(init);

function init () 
{
			var myMap = new ymaps.Map("y_map", {
				center: [ofice_x + delta_x,ofice_y - delta_y],
				zoom: 15,
				controls: [],//без элементов управления
			}, {
				searchControlProvider: 'yandex#search'
			}),
    // Создание макета содержимого хинта.
    // Макет создается через фабрику макетов с помощью текстового шаблона.
    HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
    	"{{ properties.address }}" +
    	"</div>", {
                // Определяем метод getShape, который
                // будет возвращать размеры макета хинта.
                // Это необходимо для того, чтобы хинт автоматически
                // сдвигал позицию при выходе за пределы карты.
                getShape: function () {
                	var el = this.getElement(),
                	result = null;
                	if (el) {
                		var firstChild = el.firstChild;
                		result = new ymaps.shape.Rectangle(
                			new ymaps.geometry.pixel.Rectangle([
                				[0, 0],
                				[firstChild.offsetWidth, firstChild.offsetHeight]
                				])
                			);
                	}
                	return result;
                }
            }
            );

    
    function Add_point(adress, x, y)
    {
        var myPlacemark = new ymaps.Placemark([x, y], 
        { 
            iconContent: '',
            balloonContent: adress
        },
        {  
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'img/map-point.png',
            iconImageSize: [32, 46],
            iconImageOffset: [-16, -23],
            iconContentOffset: [0, 0]
        });
        myMap.geoObjects.add(myPlacemark);
    }

    Add_point(addres, ofice_x, ofice_y);
}


/************карта**********/

/**показать больше**/
function Create_More_Items_System(number_initially_visible, delta_items, selector_button_parent, selector_item, hide_class)
{
    var all_elements = document.querySelectorAll(selector_item);
    var amount = all_elements.length;
    if(amount != 0)
    {
        if (amount  > number_initially_visible)
        {
            var j = 0;
            for (let item of all_elements)
            {
                j++;
                if(j > number_initially_visible)
                {
                    item.classList.add(hide_class);
                }
            }

            var parent = document.querySelector(selector_button_parent);
            let div = document.createElement('div');
            div.id = 'more_items';
            div.innerHTML = 'УВИДЕТЬ БОЛЬШЕ';
            parent.appendChild(div);

            Click_Button_More_Items(delta_items, all_elements, div.id, 'hide');
        }
    }
}

function Click_Button_More_Items(num_records, elements_reff, id_button, hide_class)
{
    var button_id_selector = '#' + id_button;
    document.querySelector(button_id_selector).addEventListener("click", function(){
        var num = 0;
        for (let item of elements_reff)
        {
            if((item.classList.contains(hide_class)) && (num < num_records))
            {
                item.classList.remove(hide_class);
                num++;
            }
        }
        if (num == 0)
        {
            document.querySelector(button_id_selector).remove();
        }
    });
}
/**показать больше**/

if(screen.width < 750)
{
    var first_items = 2;
    var delta = 2;
}
else
{
    var first_items = 3;
    var delta = 3;
}
Create_More_Items_System(first_items, delta, '#more_items_box', '.galery .gall_item', 'hide');


/******************************/

/****************формы*******************/
function Validate(form_ref, input_class)
{
    var err=0;

    var inputs = form_ref.querySelectorAll(input_class);

    for (let item of inputs)
    {
        var bool = ($(item).val() == '');

        if (bool)
        {
            err++;
            $(item).addClass("hasError");
        } 
        else 
        {
            $(item).removeClass("hasError");
        }
    }

    return err;
}

function Send_Form(form_ref,tipe_form,event)
{
    event.preventDefault();
    var err = Validate(form_ref, '.all-input');

    if (err == 0)
    {
        form_ref.reset();
        document.querySelector("#popup-order #popup_form").classList.add("hide");
        document.querySelector("#popup-order .success").classList.remove("hide");
        if(tipe_form == 'page_form')
        {
            $("#for_quest_form").click();
        }

        // var formData = new FormData(form_ref);

        // $.ajax({
        //     type: "POST",
        //     url: '/ajax/common.php',
        //     data: formData,
        //     processData: false,
        //     contentType: false,
        //     dataType: "json",
        //     success: function(data){

        //         if (data.status == true)
        //         {
        //             form_ref.reset();
        //             document.querySelector("#popup-order #popup_form").classList.add("hide");
        //             document.querySelector("#popup-order .success").classList.remove("hide");
        //             if(tipe_form == 'page_form')
        //             {
        //                 $("#for_quest_form").click();
        //             }
        //         }
        //     }
        // });
    }
}


var succes_ref = document.querySelector("#popup-order .success");
var popup_form_butt = document.querySelector("#popup-order #send_order_popup");
var popup_form = document.querySelector("#popup-order #popup_form");
popup_form_butt.addEventListener('click',() => Send_Form(popup_form,'popup',event));

$('.popup').on('click', function() {
    succes_ref.classList.add("hide");
    popup_form.classList.remove("hide");
});


var quest_form = document.querySelector(".quest #quest_form");
var form_butt = document.querySelector(".quest #send_form_butt");
form_butt.addEventListener('click',() => Send_Form(quest_form,'page_form',event));

/****************формы*******************/