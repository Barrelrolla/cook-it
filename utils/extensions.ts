if (!String.prototype.capitalize) {
  Object.defineProperty(String.prototype, "capitalize", {
    value: function (this: string): string {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
    configurable: true,
    writable: true,
  });
}
