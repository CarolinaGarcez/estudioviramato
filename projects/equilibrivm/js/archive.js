const ARCHIVE_RECORDS = [
  {
    src: 'img/contador.jpeg',
    alt: 'Captura real do Equilibrivm Experience em um celular, com o disco de vinil e o contador regressivo ativo.',
    caption: 'A experiência original no celular.'
  },
  {
    src: 'img/contador 1.jpeg',
    alt: 'Captura real do contador original mostrando dias, horas, minutos e segundos até o show.',
    caption: 'Um registro real da contagem regressiva.'
  }
];

async function recordExists(path) {
  try {
    const response = await fetch(path, { method: 'HEAD', cache: 'no-store' });
    return response.ok;
  } catch {
    return false;
  }
}

function createArchiveDialog(records, opener) {
  const dialog = document.createElement('dialog');
  dialog.className = 'archive-dialog';
  dialog.setAttribute('aria-labelledby', 'archive-dialog-title');
  dialog.setAttribute('aria-describedby', 'archive-dialog-description');

  const header = document.createElement('div');
  header.className = 'archive-dialog__header';

  const title = document.createElement('h2');
  title.className = 'archive-dialog__title';
  title.id = 'archive-dialog-title';
  title.textContent = 'Como era a espera';

  const close = document.createElement('button');
  close.className = 'archive-dialog__close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Fechar registros originais');
  close.textContent = '×';

  const intro = document.createElement('p');
  intro.className = 'archive-dialog__intro';
  intro.id = 'archive-dialog-description';
  intro.textContent = 'Antes de virar memória, este projeto contava os dias, horas, minutos e segundos para o show. Estes são registros reais da experiência original.';

  header.append(title, close);
  dialog.append(header, intro);

  records.forEach(record => {
    const figure = document.createElement('figure');
    figure.className = 'archive-dialog__figure';

    const image = document.createElement('img');
    image.className = 'archive-dialog__image';
    image.src = record.src;
    image.alt = record.alt;
    image.loading = 'lazy';
    image.decoding = 'async';

    const caption = document.createElement('figcaption');
    caption.className = 'archive-dialog__caption';
    caption.textContent = record.caption;

    figure.append(image, caption);
    dialog.append(figure);
  });

  document.body.append(dialog);

  const closeDialog = () => dialog.close();
  close.addEventListener('click', closeDialog);
  dialog.addEventListener('close', () => {
    opener.focus();
  });

  opener.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      close.focus();
    }
  });
}

export async function initArchive() {
  const opener = document.getElementById('archive-open');
  if (!opener) return;

  const records = (await Promise.all(
    ARCHIVE_RECORDS.map(async record => await recordExists(record.src) ? record : null)
  )).filter(Boolean);

  if (records.length === 0) return;

  createArchiveDialog(records, opener);
  opener.hidden = false;
}
