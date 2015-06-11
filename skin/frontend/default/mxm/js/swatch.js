Swatch = Class.create();
Swatch.prototype = {
    initialize: function()
    {
    },
    getBaseImageByAttrValue: function(attrValue)
    {
        var colorObj = false;
        for (i = 0; i < colorConfig.length; i++)
        {
            if (colorConfig[i].id == attrValue)
            {
                colorObj = colorConfig[i].image;
                break;
            }
        }
        if (colorObj)
        {
            return colorObj[0];

        }
    }
    ,
    /*
     * get last configurable product's attributeId
     * @returns string
     */
    getLastAttrId: function() {
        /*attributeID = '';
        for (var tempAttributeID in spConfig.config.attributes)
		{
            attributeID = tempAttributeID;
			console.log(attributeID);
		}*/  
		lastAttribute = jQuery(jQuery('.super-attribute-select')[jQuery('.super-attribute-select').length-1]).attr('id');

		return lastAttribute.substring(9, lastAttribute.length);
        //return attributeID;
    },
    /*
     * setup image switcher for product view
     */
    setupSwatch: function()
    {

        var lastAttrId = this.getLastAttrId();
	
		if(lastAttrId)
		{
			proxy = this;
			jQuery("#attribute" + lastAttrId).next().find('li a').click(function() {
				var attrValue = jQuery(this).attr('value');

				if (attrValue)
				{
			
					var baseImage = proxy.getBaseImageByAttrValue(attrValue);
					if(baseImage)
					{
						jQuery('#zoom1 img').attr('src', baseImage.base_image);
						jQuery('#zoom1').attr('href', baseImage.hi_res);
						jQuery('#zoom1').CloudZoom();
					}
				}

			});
		}

    }

};

function refreshAttributeSwatch()
{
    jQuery('.swatch-image').each(function()
    {
        jQuery(this).remove();
    });
    jQuery('.super-attribute-select').each(function()
    {

        var isnotnull = 0;
        attributeId = jQuery(this).attr('id').substring(9, jQuery(this).attr('id').length);
        attributeSwatchHtml = '<ul class="swatch-image clearfix">';
        attributeSelectBox = jQuery('#attribute' + attributeId + ' option')

        attributeSelectBox.each(function()
        {
            if (attributeSelectBox.length > 1)
            {
                if (jQuery(this).attr('value'))
                {
                    attributeSwatchHtml += swatchJson[attributeId][jQuery(this).attr('value')];
                    isnotnull = 1;
                    //alert(jQuery(this).prop('selected'));
                }
            }
        });

        attributeSwatchHtml += '</ul>';
        if (isnotnull)
            if (!jQuery(this).attr('disabled'))
                jQuery(attributeSwatchHtml).insertAfter('#attribute' + attributeId);
    });

    jQuery('.attribute_text').html('');
    jQuery('.swatch a').each(function()
    {
        if (jQuery(this).attr('value') == jQuery(this).parent().parent().prev().val())
        {
            var attributeId = jQuery(this).parent().parent().prev().attr('id').substring(9, jQuery(this).parent().parent().prev().attr('id').length);
            var attributeText = jQuery(this).parent().parent().prev().find(":selected").text();
            jQuery('#attribute_text_' + attributeId).html(' ' + attributeText);
            if (jQuery(this).children().length > 0)
            {
                jQuery(this).children().css('border', '2px solid #024672');
            }
            else
                jQuery(this).css('border', '2px solid #024672');
        }



    });

    jQuery('.swatch').mouseover(function() {
        var optionId = jQuery(this).find('a').attr('value');
        var selectBox = jQuery(this).parent().prev();
        var attributeId = selectBox.attr('id').substring(9, selectBox.attr('id').length);
        jQuery('#attribute_text_' + attributeId).html(' ' + getLabelByDropdownAttrOption(attributeId, optionId));

    });

    jQuery('.swatch').mouseout(function() {

        var selectBox = jQuery(this).parent().prev();
        var attributeId = selectBox.attr('id').substring(9, selectBox.attr('id').length);
        if (selectBox.val())
            jQuery('#attribute_text_' + attributeId).html(' ' + selectBox.find("option:selected").text());
        else
            jQuery('#attribute_text_' + attributeId).html('');
    });

    var swatch = new Swatch();
    swatch.setupSwatch();
}
function swatchClick(me)
{
    var value = jQuery(me).children(0).attr('value');
    jQuery(this).parent().prev().val(value);


    dropdown = document.getElementById(jQuery(me).parent().prev().attr('id'));
	
    for (var i = 0; i < jQuery('#'+jQuery(me).parent().prev().attr('id')+' option').length; i++) {
        if (dropdown.options[i].value == value) {

            dropdown.selectedIndex = i;
            var element = $(jQuery(me).parent().prev().attr('id'));
            spConfig.configureElement(element);
            //  attributeId = jQuery(dropdown).attr('id').substring(9, jQuery(this).attr('id').length);
            var attributeId = jQuery(dropdown).attr('id').substring(9, jQuery(dropdown).attr('id').length);
            jQuery('#attribute_text_' + attributeId).html(' ' + jQuery(dropdown).find("option:selected").text());
            jQuery('#'+jQuery(me).parent().prev().attr('id')).change();
            break;
        }
    }
    refreshAttributeSwatch();
}

jQuery(document).ready(function() {
     
	spConfig.getIdOfSelectedProduct = function()
	{
		 var existingProducts = new Object();
		 for(var i=this.settings.length-1;i>=0;i--)
		 {
			 var selected = this.settings[i].options[this.settings[i].selectedIndex];
			 if(selected.config)
			 {
				for(var iproducts=0;iproducts<selected.config.products.length;iproducts++)
				{
					var usedAsKey = selected.config.products[iproducts]+"";
					if(existingProducts[usedAsKey]==undefined)
					{
						existingProducts[usedAsKey]=1;
					}
					else
					{
						existingProducts[usedAsKey]=existingProducts[usedAsKey]+1;
					}
				 }
			 }
		 }
		 for (var keyValue in existingProducts)
		 {
			for ( var keyValueInner in existingProducts)
			 {
				if(Number(existingProducts[keyValueInner])<Number(existingProducts[keyValue]))
				{
					delete existingProducts[keyValueInner];
				}
			 }
		 }
		 var sizeOfExistingProducts=0;
		 var currentSimpleProductId = "";
		 for ( var keyValue in existingProducts)
		 {
			currentSimpleProductId = keyValue;
			sizeOfExistingProducts=sizeOfExistingProducts+1
		 }
		 if(sizeOfExistingProducts==1)
		 {
		//  console.log(imageInfo[currentSimpleProductId].image);
		//	 console.log("Selected product is: "+currentSimpleProductId)
             var baseImage = imageInfo[currentSimpleProductId].image;
					if(baseImage)
					{
						jQuery('#zoom1 img').attr('src', baseImage.base_image);
						jQuery('#zoom1').attr('href', baseImage.hi_res);
						jQuery('#zoom1').CloudZoom();
					}
			getGalleryByProductId(currentSimpleProductId);
               
		 }
	}
		
    var swatch2 = new Swatch();
    jQuery("#attribute"+swatch2.getLastAttrId()).bind("change", function()
    {
       spConfig.getIdOfSelectedProduct();
      //   console.log(imageInfo[selectedProductId].image);
       
  
    });    
  
    refreshAttributeSwatch();
   
    /*
    jQuery(".super-attribute-select").bind("change", function()
    {
        var attrValue = jQuery(this).find("option:selected").attr('value');
        if (attrValue)
        {
            var baseImage = proxy.getBaseImageByAttrValue(attrValue);
            jQuery('#image').attr('src', baseImage.base_image);
            jQuery('.ig_lightbox2').attr('href', baseImage.hi_res);
        }
        
        
    });
    */
    
	jQuery('.swatch').click();
});

function getLabelByDropdownAttrOption(attribute_id, option_id)
{
    return jQuery("#attribute" + attribute_id + " option[value='" + option_id + "']").text();
}





function  createLiNodeByImage(image)
    {
    console.log(image)
    a = document.createElement('a');
        a.setAttribute('class', 'cloud-zoom-gallery');
        a.setAttribute('href', image.hi_res);
        a.setAttribute('title', image.label);
		a.setAttribute('rel', 'useZoom: \'zoom1\', smallImage: \''+image.base_image+'\'');
		
        img = document.createElement("img");
        img.alt = "";
        img.src = image.thumbnail;
        a.appendChild(img);
        li  =  document.createElement('li');
        li.appendChild(a);
        return li;
    };


 function getGalleryByProductId(productId)
 {
	 if(productId)
	 {
		 jQuery('.more-views ul').empty();
		 for (index = 0; index < imageInfo[productId].gallery.length; ++index) {
			var thumbnail =    imageInfo[productId].gallery[index];
			var li= createLiNodeByImage(thumbnail);
			console.log(li);
			jQuery('.more-views ul').append(li);
		}
		jQuery('.cloud-zoom-gallery').CloudZoom();
	}

 }

 