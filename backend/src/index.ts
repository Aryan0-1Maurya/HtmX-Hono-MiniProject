import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'
import { cors } from 'hono/cors'
import { caseData } from '../data/todos'

const app = new Hono()

app.use('/*', cors())

app.get('/case', (c) => {
  const listItems = getListItems(caseData.cases)

  return c.html(
    html`${listItems}`
  )
})

app.post('/case', async (c) => {
  const { newCase } = await c.req.parseBody()
  caseData.createCase(newCase as string)

  const listItems = getListItems(caseData.cases)

  return c.html(
    html`${listItems}`
  )
})

app.put('/case/:id', async (c) => {
  const caseId = await c.req.param('id')
  caseData.updateCase(Number(caseId))

  const listItems = getListItems(caseData.cases)

  return c.html(
    html`${listItems}`
  )
})

app.delete('/case/:id', async (c) => {
  const caseId = await c.req.param('id')
  caseData.deleteCase(Number(caseId))

  const listItems = getListItems(caseData.cases)

  return c.html(
    html`${listItems}`
  )
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

function getListItems(cases: typeof caseData.cases) {
  return cases.sort((a, b) => b.caseNo.localeCompare(a.caseNo, undefined, {numeric: true})
).map(c_se => (
    html`<li>
      <input 
        type="checkbox" 
        id="case_${c_se.id}" 
        ${c_se.completed ? 'checked' : ''} 
        hx-put="http://localhost:3000/case/${c_se.id}"
        hx-trigger="click" 
        hx-target="#case-list" 
      />
      <label for="case_${c_se.id}">${c_se.caseNo}</label>
      <button
        hx-delete="http://localhost:3000/case/${c_se.id}"
        hx-trigger="click" 
        hx-target="#case-list" 
      >❌</button>
    </li>`
  ))
}
