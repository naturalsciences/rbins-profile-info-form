// $Id$

(function ($) {

Drupal.behaviors.webform_addmore = {
  attach: function(context) {
    function fieldsetRepeater(container, fieldsetSelecter, addBtnTxt, delBtnTxt, numberFirstShown) {
      if ($(fieldsetSelecter).parent().find('input.add-more').length) {
        return;
      }
      var collections = Drupal.settings.webform_addmore.collections;

      if (collections.length == 0) {
        collections.push('');
      }

      for (index in collections) {
        if (collections[index].length == 0) {
          var parent_fieldset_selector = fieldsetSelecter;
        }
        else {
          var _parent_fieldset_selector = collections[index];
          var parent_fieldset_selector = _parent_fieldset_selector;
        }
        var add_more_button_id = 'webform-addmore-' + collections[index].replace(/\./g, '-');
        var del_more_button_id = 'webform-addmore-del-' + collections[index].replace(/\./g, '-');

        var addBtn = $('<input type="button" id="' + add_more_button_id + '" class="add-more button white" />').val(addBtnTxt);
        addBtn.click(function() {
          var parent_fieldset = $(this).parent();
          if (parent_fieldset.length > 0) {
            var _parent_id = parent_fieldset.attr('class');
            var parent_id = '.' + _parent_id.replace(/ /g, '.');
            var hiddenFieldsets = $(parent_id).find(fieldsetSelecter).not(':visible');
          }
          else {
            var hiddenFieldsets = fieldsets.not(':visible');
          }

          var next = hiddenFieldsets.filter(':first');
          next.fadeIn();
          var delBtn = $('<input type="button" class="del-btn button white" />').val('Remove');
          $(next).append('<div class="clearfix"></div>', delBtn);

          if(hiddenFieldsets.size() < 2) {
            $(this).hide();
          }

        });


      $('.del-btn').livequery(function(){
        $('.del-btn').click(function() {
          var parent_fieldset = $(this).parent();
          parent_fieldset.find(':input').val('');
          parent_fieldset.find('.del-btn').remove();
          parent_fieldset.hide();


          // We need to rescan the page for shown fieldsets
          if (parent_fieldset.length > 0) {
            var _parent_id = parent_fieldset.attr('class');
            var parent_id = '.' + _parent_id.replace(/ /g, '.');

            var shownFieldsets = $(parent_id).find(fieldsetSelecter).not(':hidden');

          }
          else {
            var shownFieldsets = fieldsets.not(':hidden');
          }

          if(shownFieldsets.size() < 2) {
            $(this).hide();
          }

          var hiddenFieldsets = $(parent_id).find(fieldsetSelecter).not(':visible');

          var cont = parent_fieldset.parent().parent();

          $(cont).append(addBtn);
          addBtn.show();
        });
      });

      var parent = $(parent_fieldset_selector);
      var fieldsets = $(parent).find(fieldsetSelecter).hide();

      $(parent).append(addBtn);

        var count = 0;
        $.each(fieldsets, function(i, fieldset){
          var val = $(fieldset).find(':input').val();
          if ( typeof val !== "undefined" && val.length > 0){
            count += 1;
          }
        })
        if (count > 1) {
          for( var i = 0; i < count; i++ ) {
            addBtn.click();
          }
        }
        else {
          for( var i = 0; i < numberFirstShown; i++ ) {
            addBtn.click();
          }
        }
      }
    }

    Drupal.settings.webform_addmore.collections = new Array();
    $.each(
      Drupal.settings.webform_addmore.fieldsets,
      function(i, _fieldset) {
        var fieldset = '.' + _fieldset.replace(/ /g, '.');
        var parent_fieldset = $(fieldset).parents('fieldset');
        if (parent_fieldset.length > 0) {
          var _parent_id = parent_fieldset.attr('class');
          var parent_id = '.' + _parent_id.replace(/ /g, '.');
          if ($.inArray(parent_id, Drupal.settings.webform_addmore.collections) < 0) {
            Drupal.settings.webform_addmore.collections.push(parent_id);
          }
        }
        $(fieldset).addClass('webform-addmore');
      }
    );



    fieldsetRepeater($('.webform-client-form'), '.webform-addmore',
Drupal.settings.webform_addmore.addlabel, Drupal.settings.webform_addmore.dellabel, 1);
  }
};

})(jQuery);
