let generateIndex = (min, max) => Math.floor(Math.random()*max)


fetch('https://poetrydb.org/title')
  .then(data => data.json())
  .then(data => {
      titles = data.titles;
      for (i = 0; i < 25; i++) {
          getPoem(titles[generateIndex(0, titles.length)]);
      }
      return titles;
  })
  .then(titles => {
      let poem_body = document.getElementById('poem-body');

      function scrollHandler(e) {
          if (e.target.scrollTop >= e.target.scrollTopMax*0.2) {
              let line_elems = document.getElementsByClassName('poem-line');
              line_elems.item(0).remove();
              getPoem(titles[generateIndex(0, titles.length)]);
          }
          if (document.getElementsByClassName('scroll-reminder-wrapper').length !== 0) { //remove scroll reminder
              let reminder_elem = document.getElementsByClassName('scroll-reminder-wrapper').item(0);
              let fade_elem = document.getElementsByClassName('poem-fade').item(0);
              reminder_elem.classList.add('hide');
              fade_elem.classList.add('hide');
              reminder_elem.classList.remove('show');
              fade_elem.classList.remove('show');
              window.setTimeout(() => {reminder_elem.remove(); fade_elem.remove()}, 400);
          }
      }

      poem_body.addEventListener('scroll', _.throttle(scrollHandler, 100), { passive: true })
  }).catch(error => console.error(error));

function getPoem(title) {
    fetch(`https://poetrydb.org/title/${title}/title,lines`)
        .then(poem => poem.json())
        .then(poem => {
            let lines = poem[0].lines;
            let selected_line = ""
            while (selected_line === "") {
                selected_line = lines[generateIndex(0, lines.length)];
            }

            let p_node = document.createElement('p');
            p_node.classList.add('poem-line')
            p_node.setAttribute('id', Date.now() )
            let text_node = document.createTextNode(selected_line)
            p_node.appendChild(text_node);
            let poem_body = document.getElementById('poem-wrapper');
            poem_body.appendChild(p_node)
            //console.log("poem retrived");
        })
        .catch(error => console.error(error));
}

let about_link = document.getElementsByClassName('about-link').item(0);
let about_text = document.getElementsByClassName('about-text').item(0);
about_link.addEventListener('click', (e) => {
    console.log(about_text.classList.contains('hide'));
    if (about_text.classList.contains('hide')) { //default state, hidden
        console.log('qwersdafa');
        about_text.classList.add('show');
        about_text.classList.remove('hide');
        about_link.textContent = 'close';
        about_link.style['text-decoration'] = 'underline';
    } else if (about_text.classList.contains('show')) {
        about_text.classList.add('hide');
        about_text.classList.remove('show');
        about_link.textContent = 'about';
        about_link.style['text-decoration'] = '';
    }
})
