// src/utils/CommonUtils.ts
import { faker } from "@faker-js/faker";

export class CommonUtils {
  /**
   * Handles special data values and converts them to appropriate formats
   * If value doesn't have tags <>, returns the original value
   * @param value - Input value to process
   * @returns Processed value
   */
  dataValueHandler(value: string): string {
    if (!value || typeof value !== "string") return value;

    // If value doesn't start with '<', return as is
    if (!value.startsWith("<")) return value;

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
        return faker.person.lastName();
      case "<FIRSTNAME>":
        return faker.person.firstName();
      case "<DOB>":
        return this.formatDate(faker.date.past());
    }

    // Handle DOB with year offset
    if (value.startsWith("<DOB")) {
      return this.processDOBPattern(value);
    }

    // If no pattern matches but value has tags, remove them and return inner value
    if (value.startsWith("<") && value.endsWith(">")) {
      return value.slice(1, -1);
    }

    return value;
  }

  private processDatePattern(pattern: string): string {
    const today = new Date();
    const match = pattern.match(/<TODAY([+-]\d+)?>/);
    if (!match) return pattern;

    const offset = match[1] ? parseInt(match[1]) : 0;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);

    return this.formatDate(targetDate);
  }

  private processUniqueIdPattern(pattern: string): string {
    const match = pattern.match(/<UNIQUEID(\d+)?>/);
    const length = match?.[1] ? parseInt(match[1]) : 12;
    return Math.random()
      .toString()
      .slice(2, 2 + length);
  }

  private processDOBPattern(pattern: string): string {
    const match = pattern.match(/<DOB\s*(-?\d+)Y>/);
    if (!match) return this.formatDate(faker.date.past());

    const yearsBack = parseInt(match[1]);
    const date = new Date();
    date.setFullYear(date.getFullYear() - yearsBack);
    return this.formatDate(faker.date.past({ years: yearsBack }));
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  isEmpty(value: any): boolean {
    return value === undefined || value === null || value === "";
  }
}
