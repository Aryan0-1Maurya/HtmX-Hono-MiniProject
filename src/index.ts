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

function getListItems(cases: typeof caseData.cases) {
  return cases.map(
    (c_se) =>
      html`
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
        <td
          class="relative whitespace-nowrap pr-4 text-right text-sm font-medium md:pr-0 lg:pr-0 py-2 pl-0"
        >
          <a class="text-indigo-600 hover:text-indigo-900"></a>
          <div class="inline-block relative text-left">
            <div>
              <button
                class="border border-transparent rounded-full text-gray-400 grid focus:ring-offset-2 focus:ring-offset-gray-100 pb-2 hover:text-gray-600 focus:outline-none focus:ring-2 px-0 bg-opacity-100 bg-white"
                id="menu-button"
                type="button"
              >
                <span class="sr-only">Open options</span
                ><i class="transform h-5 w-5 mr-6">
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                    ></path></svg
                ></i>
              </button>
            </div>
            <div
              class="hidden ring-1 ring-opacity-5 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring ring-black transform focus:outline-none"
            >
              <div class="pt-1 pb-1">
                <a
                  class="text-gray-700 block px-4 py-2 text-sm"
                  id="menu-item-0"
                  >Account settings</a
                ><a
                  class="text-gray-700 block px-4 py-2 text-sm"
                  id="menu-item-1"
                  >Support</a
                ><a
                  class="text-gray-700 block px-4 py-2 text-sm"
                  id="menu-item-2"
                  >License</a
                >
                <form class="flex-col mb-0">
                  <button
                    class="border border-transparent text-gray-700 block w-full px-4 py-2 text-left text-sm tracking-wide rounded border-transparent focus:outline-none"
                    id="menu-item-3"
                    type="button"
                  >
                    <span class="text-sm">Sign out</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </td>
      `
      // html`
      // <tr>
      //   <td>${c_se.caseNo}</td>
      //   <td>Last Name</td>
      //   <td>Email</td>
      // </tr>
      // `
  );
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
}
