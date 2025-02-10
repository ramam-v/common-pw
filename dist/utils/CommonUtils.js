"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUtils = void 0;
// src/utils/CommonUtils.ts
const faker_1 = require("@faker-js/faker");
class CommonUtils {
    /**
     * Handles special data values and converts them to appropriate formats
     * @param value - Input value to process
     * @returns Processed value
     */
    dataValueHandler(value) {
        if (!value || typeof value !== "string")
            return value;
        // Handle date patterns
        if (value.startsWith("<TODAY")) {
            return this.processDatePattern(value);
        }
        // Handle unique ID patterns
        if (value.startsWith("<UNIQUEID")) {
            return this.processUniqueIdPattern(value);
        }
        // Handle faker patterns
        switch (value) {
            case "<LASTNAME>":
                return faker_1.faker.person.lastName();
            case "<FIRSTNAME>":
                return faker_1.faker.person.firstName();
            case "<DOB>":
                return this.formatDate(faker_1.faker.date.past());
        }
        // Handle DOB with year offset
        if (value.startsWith("<DOB")) {
            return this.processDOBPattern(value);
        }
        return value;
    }
    processDatePattern(pattern) {
        const today = new Date();
        const match = pattern.match(/<TODAY([+-]\d+)?>/);
        if (!match)
            return pattern;
        const offset = match[1] ? parseInt(match[1]) : 0;
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + offset);
        return this.formatDate(targetDate);
    }
    processUniqueIdPattern(pattern) {
        const match = pattern.match(/<UNIQUEID(\d+)?>/);
        const length = match?.[1] ? parseInt(match[1]) : 12;
        return Math.random()
            .toString()
            .slice(2, 2 + length);
    }
    processDOBPattern(pattern) {
        const match = pattern.match(/<DOB\s*(-?\d+)Y>/);
        if (!match)
            return this.formatDate(faker_1.faker.date.past());
        const yearsBack = parseInt(match[1]);
        const date = new Date();
        date.setFullYear(date.getFullYear() - yearsBack);
        return this.formatDate(faker_1.faker.date.past({ years: yearsBack }));
    }
    formatDate(date) {
        return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
    }
    isEmpty(value) {
        return value === undefined || value === null || value === "";
    }
}
exports.CommonUtils = CommonUtils;
//# sourceMappingURL=CommonUtils.js.map