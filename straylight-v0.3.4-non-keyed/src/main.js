import { html, applyTemplate } from 'straylight';
import { store, actions } from './store';

function onActionClick(e) {
  let { action, id } = e.target.dataset;
  if (action) {
    actions[action](id ? parseInt(id) : undefined);
  }
}

applyTemplate('#main', html`
  <div class='container'>
    <div class='jumbotron' .onclick=${onActionClick}>
      <div class='row'>
        <div class='col-md-6'>
          <h1>Straylight</h1>
        </div>
        <div class='col-md-6'>
          <div class='row'>
            <div class='col-sm-6 smallpad'>
              <button
                id='run'
                type='button'
                class='btn btn-primary btn-block'
                data-action='run'>Create 1,000 rows</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button
                id='runlots'
                type='button'
                class='btn btn-primary btn-block'
                data-action='runLots'>Create 10,000 rows</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button
                id='add'
                type='button'
                class='btn btn-primary btn-block'
                data-action='add'>Append 1,000 rows</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button
                id='update'
                type='button'
                class='btn btn-primary btn-block'
                data-action='update'>Update every 10th row</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button
                id='clear'
                type='button'
                class='btn btn-primary btn-block'
                data-action='clear'>Clear</button>
            </div>
            <div class='col-sm-6 smallpad'>
              <button
                id='swaprows'
                type='button'
                class='btn btn-primary btn-block'
                data-action='swapRows'>Swap Rows</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class='table table-hover table-striped test-data'>
      <tbody .onclick=${onActionClick}>
        ${
          store.observable.map(({ data, selected }) =>
            data.map(d => html`
              <tr class=${d.id === selected ? 'danger' : ''}>
                <td class='col-md-1'>${d.id}</td>
                <td class='col-md-4'>
                  <a data-id=${d.id} data-action='select'>${d.label}</a>
                </td>
                <td class='col-md-1'>
                  <a>
                    <span
                      class='glyphicon glyphicon-remove'
                      aria-hidden='true'
                      data-id=${d.id}
                      data-action='delete'></span>
                  </a>
                </td>
                <td class='col-md-6'></td>
              </tr>
            `)
          )
        }
      </tbody>
    </table>
    <span class='preloadicon glyphicon glyphicon-remove' aria-hidden='true'></span>
  </div>
`);
