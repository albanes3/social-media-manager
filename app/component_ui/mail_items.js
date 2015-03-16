'use strict';

define(

  [
    'flight/lib/component',
    './with_select'
  ],

  function(defineComponent, withSelect) {

    return defineComponent(mailItems, withSelect);

    function mailItems() {

      this.defaultAttrs({
        searchBar: 'tfnewsearch',
        searchButton: 'tfbutton',
        deleteFolder: 'trash',
        selectedClass: 'selected',
        allowMultiSelect: true,
        selectionChangedEvent: 'uiMailItemSelectionChanged',
        selectedMailItems: [],
        selectedFolders: [],
        //selectors
        itemContainerSelector: null,
        itemSelector: 'tr.mail-item',
        selectedItemSelector: 'tr.mail-item.selected'
      });

      this.renderItems = function(ev, data) {
        this.select('itemContainerSelector').html(data.markup);
        //new items, so no selections
        this.trigger('uiMailItemSelectionChanged', {selectedIds: []});
      }

      this.updateMailItemSelections = function(ev, data) {
        this.attr.selectedMailItems = data.selectedIds;
      }

      this.searchMailItems = function(searchTerm, data) {
        var sheet = document.styleSheets[0];
        
        var posts = getElementsByClassName("mail-item");
        for(var i = 0; i < slides.length; i++)
        {
          if($('#' + i.id).find('.mailContact').indexOf(searchTerm) > -1 && 
             $('#' + i.id).find('.mailSubject').indexOf(searchTerm) > -1 &&
             $('#' + i.id).find('.mailMessage').indexOf(searchTerm) > -1){
            sheet.insertRule("#" + i.id + " { display: none; }", 1);
            element.style.color = '#ff0000';
          }
        }
      }

      this.updateFolderSelections = function(ev, data) {
        this.attr.selectedFolders = data.selectedIds;
      }

      this.requestDeletion = function() {
        this.trigger('uiMoveItemsRequested', {
          itemIds: this.attr.selectedMailItems,
          fromFolder: this.attr.selectedFolders[0],
          toFolder: this.attr.deleteFolder
        });
      };

      this.after('initialize', function() {
        this.on(document, 'dataMailItemsServed', this.renderItems);
        this.on(document, 'uiDeleteMail', this.requestDeletion);

        this.on('uiMailItemSelectionChanged', this.updateMailItemSelections);
        this.on(document, 'uiFolderSelectionChanged', this.updateFolderSelections);

        this.trigger('uiMailItemsRequested');
      });
    }
  }
);
