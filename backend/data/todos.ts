export const caseData = {
    cases: [
        {
            "id": 1,
            "statusCode": "OP",
            "statusDate": "07-10-2020",
            "caseNo": "2022CV000033",
            "caption": "Susan C. Murray, Individually et al vs. Thomas W. Metcalf et al",
            "completed": false
        },
        {
            "id": 2,
            "statusCode": "FL",
            "statusDate": "10-24-2018",
            "caseNo": "2018TJ000081",
            "caption": "CACH, LLC vs. Courtney M Bogenschneider",
            "completed": false
        },
        {
            "id": 3,
            "statusCode": "CL",
            "statusDate": "11-10-2021",
            "caseNo": "2021FA001715",
            "caption": "Andreas Transo vs. Abbey Collins",
            "completed": false
        },
    ],
    getNextId: function () {
        return this.cases.sort((a, b) => b.id - a.id)[0].id + 1
    },
    createCase: function (newCase: string) {

        this.cases = [...this.cases, {
            "id": this.getNextId(),
            "statusCode": "",
            "statusDate": "",
            "caseNo": newCase,
            "caption": "",
            "completed": false
        }]

        return this.cases
    },
    updateCase: function (caseId: number) {

        const otherCases = this.cases.filter(c_se => c_se.id !== caseId)
        const c_se = this.cases.filter(c_se => c_se.id === caseId)[0]

        this.cases = [...otherCases, {
            ...c_se, completed: !c_se.completed
        }]

        return this.cases
    },
    deleteCase: function (caseId: number) {

        this.cases = this.cases.filter(c_se => c_se.id !== caseId)

        return this.cases
    },
}