const leftMenu = $('.leftMenu');
const rightMenu = $('.rightMenu');
const triggle = $('#triggle');
const menuItems = $('.nav-item li');

triggle.click(function () {
  let leftMenuWidth = leftMenu.outerWidth();
  if (triggle.attr('class') == 'open') {
    triggle.removeClass('open').addClass('close');
    leftMenu.animate({ left: '0px' }, 1000);
    rightMenu.animate({ left: `${leftMenuWidth}` }, 1000);
    for (let i = 1; i <= menuItems.length; i++) {
      $(`.item${i}`).animate(
        { paddingTop: '25px', opacity: '1' },
        i * 100 + 1000
      );
    }
  } else {
    triggle.removeClass('close').addClass('open');
    leftMenu.animate({ left: `-${leftMenuWidth}` }, 1000);
    rightMenu.animate({ left: `0px` }, 1000);
    menuItems.animate({ paddingTop: '50px', opacity: '0' }, 1000);
  }
});
