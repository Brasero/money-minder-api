import request from "supertest";
import app from "@money/app";

// Mock du fichier index.ts pour eviter que le server soit lancé
jest.mock("@money/index", () => {
    return {
        __esModule: true, // indique que le module utilise `export default`
        default: () => {} // On renvoie une fonction vide pour mocker le server
    }
})
describe("Testign user routes", () => {
    it('should return 200 & create user', async (done) => {
        request(app)
            .post(`/api/v1/user/signin`)
            .field({
                nom: "Doe",
                prenom: "John",
                pseudo: "JohnnyDoe",
                mail: "johndoe@gmail.com",
                mdp: "Johndoe2512$",
                birthday: (new Date("25/12/1990")).toString()
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBe({message: "User created", success: true})
                done();
            })
    }, 10000);
})