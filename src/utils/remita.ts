class RemitaPaymentUtil {
  private cachedScripts: string[] = [];
  private loaded: boolean = false;
  private error: boolean = false;

  // Method to load the Remita payment script dynamically
  loadScript(live = false): Promise<void> {
    const scriptSrc = live
      ? "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js"
      : "https://demo.remita.net/payment/v1/remita-pay-inline.bundle.js";

    // Avoid loading the script multiple times
    if (this.cachedScripts.includes(scriptSrc)) {
      this.loaded = true;
      this.error = false;
      return Promise.resolve();
    }

    this.cachedScripts.push(scriptSrc);

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;

      script.onload = () => {
        this.loaded = true;
        this.error = false;
        resolve();
      };

      script.onerror = () => {
        const index = this.cachedScripts.indexOf(scriptSrc);
        if (index >= 0) this.cachedScripts.splice(index, 1);
        script.remove();
        this.loaded = false;
        this.error = true;
        reject("Failed to load the Remita payment script.");
      };

      document.body.appendChild(script);
    });
  }

  // Method to initiate the payment process
  startPayment(remitaData: {
    key: string;
    transactionId: string;
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
    narration: string;
    onSuccess: (response: any) => void;
    onError: (error: string) => void;
    onClose: () => void;
  }): Promise<string> {
    const { key, transactionId, customerId, firstName, lastName, email, amount, narration, onSuccess, onError, onClose } = remitaData;

    if (!this.loaded) {
      return Promise.reject("Remita payment script is not loaded.");
    }

    const payload = {
      key,
      transactionId,
      customerId,
      firstName,
      lastName,
      email,
      amount,
      narration,
      onSuccess,
      onError,
      onClose,
    };

    try {
      const paymentEngine = (window as any).RmPaymentEngine.init(payload);
      paymentEngine.showPaymentWidget();
      return Promise.resolve("Payment widget displayed.");
    } catch (error) {
      return Promise.reject("Error initiating the payment engine.");
    }
  }
}

export default new RemitaPaymentUtil();
