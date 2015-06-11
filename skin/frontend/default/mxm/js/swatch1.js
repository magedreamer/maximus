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
     * get first configurable product's attributeId
     * @returns string
     */
    getLastAttrId: function() {
        attributeID = '';
        for (var tempAttributeID in spConfig.config.attributes)
            attributeID = tempAttributeID;
        return attributeID;
    },
    /*
     * setup image switcher for product view
     */
    setupSwatch: function()
    {

        var lastAttrId = this.getLastAttrId();
        proxy = this;
        jQuery("#attribute" + lastAttrId).next().find('li a').click(function() {
            var attrValue = jQuery(this).attr('value');

            if (attrValue)
            {
                var baseImage = proxy.getBaseImageByAttrValue(attrValue);
                jQuery('#zoom1 img').attr('src', baseImage.base_image);
                jQuery('#zoom1').attr('href', baseImage.hi_res);
                jQuery('#zoom1').CloudZoom();
            }

        });

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
    for (var i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value == value) {

            dropdown.selectedIndex = i;
            var element = $(jQuery(me).parent().prev().attr('id'));
            spConfig.configureElement(element);
            //  attributeId = jQuery(dropdown).attr('id').substring(9, jQuery(this).attr('id').length);
            var attributeId = jQuery(dropdown).attr('id').substring(9, jQuery(dropdown).attr('id').length);
            jQuery('#attribute_text_' + attributeId).html(' ' + jQuery(dropdown).find("option:selected").text());
            break;
        }
    }
    refreshAttributeSwatch();
}

jQuery(document).ready(function() {
    refreshAttributeSwatch();
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
});

function getLabelByDropdownAttrOption(attribute_id, option_id)
{
    return jQuery("#attribute" + attribute_id + " option[value='" + option_id + "']").text();
}