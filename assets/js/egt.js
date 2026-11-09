(function () {
  'use strict';
  var classificationMetrics = {
    rejection: {title: 'Successful paths incorrectly rejected', direction: 'Lower is better', alt: 'Successful paths rejected: Force-angle 39.5%; Pose-margin 45° 35.3%, 60° 21.7%, 75° 11.4%; EGT without pose–contact prior 4.8%; EGT 2.2%.'},
    acceptance: {title: 'Failed executions incorrectly accepted', direction: 'Lower is better', alt: 'Failed executions accepted: Force-angle 13.5%; Pose-margin 45° 13.5%, 60° 38.5%, 75° 63.5%; EGT without pose–contact prior 71.2%; EGT 7.7%.'},
    accuracy: {title: 'Classification accuracy', direction: 'Higher is better', alt: 'Correct predictions: Force-angle 62.6%; Pose-margin 45° 66.5%, 60° 76.9%, 75° 84.5%; EGT without pose–contact prior 89.8%; EGT 97.4%.'}
  };
  var classificationButtons = document.querySelectorAll('[data-classification-metric]');
  classificationButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var metric = button.dataset.classificationMetric;
      var image = document.getElementById('classification-plot');
      var base = image.getAttribute('src').replace(/classification-[a-z]+[.]svg$/, 'classification-');
      image.src = base + metric + '.svg';
      image.alt = classificationMetrics[metric].alt;
      document.getElementById('classification-mobile').srcset = base + metric + '-mobile.svg';
      document.getElementById('classification-title').textContent = classificationMetrics[metric].title;
      document.getElementById('classification-direction').textContent = classificationMetrics[metric].direction;
      classificationButtons.forEach(function (item) {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
  });
  var metricButtons = document.querySelectorAll('[data-metric]');
  metricButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var metric = button.dataset.metric;
      metricButtons.forEach(function (item) {
        var selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      document.querySelectorAll('.chart-row').forEach(function (row) {
        var value = Number(row.dataset[metric]);
        row.querySelector('.bar').style.width = (metric === 'time' ? value / 80 * 100 : value) + '%';
        var spread = Number(row.dataset.std);
        var whisker = row.querySelector('.bar-error');
        whisker.hidden = metric !== 'time';
        row.querySelector('.chart-uncertainty').hidden = metric !== 'time';
        if (metric === 'time') {
          var lower = Math.max(0, value - spread);
          var upper = Math.min(80, value + spread);
          whisker.style.left = (lower / 80 * 100) + '%';
          whisker.style.width = ((upper - lower) / 80 * 100) + '%';
        }
        row.querySelector('.chart-value').textContent = metric === 'time' ? value.toFixed(2) + ' s' : value + '%';
      });
      document.querySelectorAll('.chart-mid').forEach(function (label) { label.textContent = metric === 'time' ? '40' : '50'; });
      document.querySelectorAll('.chart-max').forEach(function (label) { label.textContent = metric === 'time' ? '80 s' : '100%'; });
      document.getElementById('chart-description').textContent = metric === 'time'
        ? 'Mean goal-reaching time on shared successful runs (N = 21, 17, 19 for Terrains 1–3). Whiskers and ± values show one standard deviation. Failed runs are excluded; compare alongside failure rates. Lower is better.'
        : 'Failure rate across all 50 trials per method and terrain. Lower is better.';
    });
  });
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var comparisonPanels = document.querySelectorAll('[data-comparison-panel]');
  var clipObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var panel = entry.target;
      panel.dataset.inView = entry.isIntersecting ? 'true' : 'false';
      updatePlayback(panel);
    });
  }, {threshold: 0.1});
  function loadClip(video) {
    if (!video.hasAttribute('src')) {
      video.src = video.dataset.clipSrc;
      video.load();
    }
  }
  function updatePlayback(panel) {
    var shouldPlay = !panel.hidden && panel.dataset.inView === 'true' && panel.dataset.userPaused !== 'true' && !document.hidden;
    panel.querySelectorAll('video').forEach(function (video) {
      if (shouldPlay) {
        loadClip(video);
        var promise = video.play();
        if (promise) promise.catch(function () {});
      } else { video.pause(); }
    });
  }
  comparisonPanels.forEach(function (panel) {
    panel.dataset.userPaused = reducedMotion ? 'true' : 'false';
    if (reducedMotion) panel.querySelector('[data-playback=toggle]').textContent = 'Play clips';
    clipObserver.observe(panel);
    panel.querySelector('[data-playback=toggle]').addEventListener('click', function () {
      var paused = panel.dataset.userPaused !== 'true';
      panel.dataset.userPaused = String(paused);
      this.textContent = paused ? 'Play clips' : 'Pause clips';
      updatePlayback(panel);
    });
    panel.querySelector('[data-playback=replay]').addEventListener('click', function () {
      panel.dataset.userPaused = 'false';
      panel.querySelector('[data-playback=toggle]').textContent = 'Pause clips';
      panel.querySelectorAll('video').forEach(function (video) {
        loadClip(video);
        video.currentTime = 0;
      });
      updatePlayback(panel);
    });
  });
  document.querySelectorAll('[data-comparison-target]').forEach(function (button) {
    button.addEventListener('click', function () {
      var group = button.dataset.comparisonGroup;
      document.querySelectorAll('[data-comparison-panel="' + group + '"]').forEach(function (panel) {
        panel.hidden = panel.id !== button.dataset.comparisonTarget;
        updatePlayback(panel);
      });
      document.querySelectorAll('[data-comparison-group="' + group + '"]').forEach(function (item) {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      button.scrollIntoView({block: 'nearest', inline: 'nearest'});
    });
  });
  document.addEventListener('visibilitychange', function () {
    comparisonPanels.forEach(function (panel) { updatePlayback(panel); });
  });
  var dialog = document.getElementById('figure-dialog');
  var lastFigureButton;
  document.querySelectorAll('[data-figure]').forEach(function (button) {
    button.addEventListener('click', function () {
      var figure = document.getElementById('expanded-figure');
      figure.src = button.dataset.figure;
      figure.alt = button.querySelector('img').alt;
      document.getElementById('expanded-caption').textContent = button.dataset.caption || '';
      lastFigureButton = button;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () { if (lastFigureButton) lastFigureButton.focus(); });
  document.getElementById('copy-citation').addEventListener('click', function () {
    var text = document.getElementById('bibtex').textContent;
    var status = document.getElementById('copy-status');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        status.textContent = 'BibTeX copied.';
      }).catch(function () { selectCitation(); });
    } else { selectCitation(); }
    function selectCitation() {
      var range = document.createRange();
      range.selectNodeContents(document.getElementById('bibtex'));
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C (or Command+C) to copy.';
    }
  });
})();
