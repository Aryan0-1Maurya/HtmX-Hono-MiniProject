import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html } from "hono/html";
import { cors } from "hono/cors";
import { caseData } from "../data/todos";

const app = new Hono();

app.use("/*", cors());

app.get("/case", (c) => {
  const listItems = getListItems(caseData.cases);

  console.log({ listItems });
  return c.html(html`${listItems}`);
});

app.post("/case", async (c) => {
  const { newCase } = await c.req.parseBody();
  caseData.createCase(newCase as string);

  const listItems = getListItems(caseData.cases);

  return c.html(html`${listItems}`);
});

app.post("/case/search", async (c) => {
  const { search } = await c.req.parseBody();
  const searchResults = caseData.searchCase(search);
  const listItems = getListItems(searchResults);
  return c.html(html`${listItems}`);
});

app.put("/case/:id", async (c) => {
  const caseId = await c.req.param("id");
  caseData.updateCase(Number(caseId));

  const listItems = getListItems(caseData.cases);

  return c.html(html`${listItems}`);
});

app.delete("/case/:id", async (c) => {
  const caseId = await c.req.param("id");
  caseData.deleteCase(Number(caseId));

  const listItems = getListItems(caseData.cases);

  return c.html(html`${listItems}`);
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

function getTableRows(cases: typeof caseData.cases) {
  return cases
    .sort((a, b) =>
      b.caseNo.localeCompare(a.caseNo, undefined, { numeric: true })
    )
    .map(
      (c_se) => html`
        <tr>
          <td
            class="whitespace-nowrap pt-4 pb-4 pl-4 pr-3 text-sm font-medium text-gray-900 md:pl-0 lg:pl-0"
          >
            <span class="text-sm">${c_se.caseNo}</span>
          </td>
          <td class="whitespace-nowrap px-3 pt-4 pb-4 text-sm text-gray-500">
            <span class="text-sm">${c_se.caption}</span>
          </td>
          <td class="whitespace-nowrap text-sm text-gray-500 px-3 py-2">
            <span class="text-sm">Brown</span>
          </td>
          <td class="whitespace-nowrap text-sm text-gray-500 px-3 py-2">
            <span class="text-sm">2021-8-12</span>
          </td>
          <td>
            <div class="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  class="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open options</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </td>
        </tr>
      `
    );
}

function getListItems(cases: typeof caseData.cases) {
  const rows = getTableRows(cases);
  return html`<tbody id="search-results" class="divide-y divide-gray-200 divide-opacity-10  hx-get="http://localhost:3001/case" hx-trigger="load" hx-swap="outerHTML" hx-target="#search-results"">${rows}</tbody>`;
}

//   return cases.sort((a, b) => b.caseNo.localeCompare(a.caseNo, undefined, {numeric: true})
// ).map(c_se => (
//     html`<li>
//       <label for="case_${c_se.id}">${c_se.caseNo}</label>
//       <span>${c_se.caption}</span>
//       <!--<button
//         hx-delete="http://localhost:3000/case/${c_se.id}"
//         hx-trigger="click"
//         hx-target="#case-list"
//       >❌</button>-->
//       <input
//       type="checkbox"
//       id="case_${c_se.id}"
//       ${c_se.completed ? 'checked' : ''}
//       hx-put="http://localhost:3000/case/${c_se.id}"
//       hx-trigger="click"
//       hx-target="#case-list"
//     />
//     </li>`
//   ))
