const request = require("supertest");

const api = require("../../src/api");
const truncate = require("../utils/truncate");
const CountrySupport = require("../utils/CountrySupport");
const StateSupport = require("../utils/StateSupport");

beforeEach(async () => {
    await truncate();
    const resps = await CountrySupport.createFiveCountries();
    await StateSupport.createFiveStates(resps[0].body);
});

test("Create state", async () => {
    const resp = await CountrySupport.findCountryByName("Brasil");
    const response = await request(api).post("/state").send({ name: "Mato Grosso", abbreviation: "MT", countryId: resp.body.id })

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Mato Grosso");
});

test("Return all states", async () => {
    const response = await request(api).get("/states").send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    expect(response.body[0].name).toBe("Minas Gerais");
    expect(response.body[1].name).toBe("Paraná");
    expect(response.body[2].name).toBe("Rio Grande do Sul");
    expect(response.body[3].name).toBe("Santa Catarina");
    expect(response.body[4].name).toBe("São Paulo");
});

test("Return all states from country", async () => {
    const brasil = (await CountrySupport.findCountryByName("Brasil")).body;
    const statesBrasil = await request(api).get(`/country/${brasil.id}/states`).send();

    const inglaterra = (await CountrySupport.findCountryByName("Inglaterra")).body;
    const statesInglaterra = await request(api).get(`/country/${inglaterra.id}/states`).send();

    expect(statesBrasil.status).toBe(200);
    expect(statesBrasil.body.length).toBe(5);
    expect(statesBrasil.body[0].name).toBe("Minas Gerais");
    expect(statesBrasil.body[1].name).toBe("Paraná");
    expect(statesBrasil.body[2].name).toBe("Rio Grande do Sul");
    expect(statesBrasil.body[3].name).toBe("Santa Catarina");
    expect(statesBrasil.body[4].name).toBe("São Paulo");

    expect(statesInglaterra.status).toBe(200);
    expect(statesInglaterra.body.length).toBe(0);
});