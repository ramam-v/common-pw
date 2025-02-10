export declare class CommonUtils {
    /**
     * Handles special data values and converts them to appropriate formats
     * @param value - Input value to process
     * @returns Processed value
     */
    dataValueHandler(value: string): string;
    private processDatePattern;
    private processUniqueIdPattern;
    private processDOBPattern;
    private formatDate;
    isEmpty(value: any): boolean;
}
