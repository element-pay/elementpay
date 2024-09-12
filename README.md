

````markdown
**Element Pay System** aims to provide an easy and secure way for people in Africa to send and receive money across borders using crypto and stablecoins, while converting them to local currencies. Built with a focus on user experience and accessibility, it is a modern payment solution for the continent's growing digital economy.

## Element Pay System: Token-Based Transaction Form for Africa

**Element Pay System** is a decentralized payment solution designed for Africa, enabling users to send money across borders with ease. It leverages blockchain technology to facilitate cross-border transactions using stablecoins like USDC, and supports conversions into local currencies such as the Nigerian Naira (NGN), Kenyan Shilling (KES), and Ghanaian Cedi (GHS).

## Features

- **Cross-Border Transfers:** Send and receive stablecoins like USDC between countries.
- **Local Currency Conversion:** Convert stablecoins to local currencies like NGN, KES, and GHS.
- **User-Friendly Interface:** A simple form that allows users to input transaction details.
- **Smart Wallet Integration:** Uses a decentralized smart wallet to handle transactions securely.
- **Dynamic Exchange Rate Fetching:** Automatically fetches and displays real-time exchange rates.
- **Responsive and Accessible Design:** Built with accessibility in mind, ensuring a smooth user experience on any device.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Components](#components)
   - [TransactionForm](#transactionform-component)
   - [SelectField](#selectfield-component)
5. [Validation Rules](#validation-rules)
6. [Customization](#customization)
7. [Contributing](#contributing)
8. [License](#license)

## Installation

Before you begin, ensure you have `node` and `npm` or `yarn` installed on your system.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/element-pay-system.git
   cd element-pay-system
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Navigate to [http://localhost:3000](http://localhost:3000) to use the application.

## Usage

1. Once you have the server running, you can access the **Transaction Form** which lets users enter transaction details such as the amount to send, the currency, and the recipient's details.
2. **Token Balance:** The application connects with a smart wallet to show the user's token balance in USDC.

3. **Real-Time Exchange Rate:** The application fetches real-time exchange rates to ensure accurate conversion between the tokens and the recipient's local currency.

4. **Recipient Details:** Users can select the currency they want to send using a drop-down list.

5. **Form Submission:** After entering all the details, users can submit the form to process the transaction.

## Components

### TransactionForm Component

The main component responsible for collecting transaction details from the user. This component manages form submission and integrates with `react-hook-form` for validation and form handling.

#### Props:

- `formMethods`: Object containing `react-hook-form` methods.
- `onSubmit`: Function to handle form submission.
- `stateProps`: Object holding the transaction state (e.g., token balance, exchange rate, recipient name).

#### Example:

```tsx
<TransactionForm
  formMethods={formMethods}
  onSubmit={handleTransactionSubmit}
  stateProps={transactionState}
/>
```

### SelectField Component

This component renders a customizable select dropdown for selecting currencies. It integrates with `react-hook-form` for validation.

#### Props:

- `id`: The unique identifier for the select input.
- `label`: Label text for the select field.
- `options`: Array of options to display in the dropdown (each containing `value` and `label`).
- `defaultValue`: Default selected option.
- `formMethods`: Object containing `react-hook-form` methods.
- `validation`: Object containing validation rules for the input.
- `error`: Error message to display if validation fails.
- `disabled`: Boolean to disable the dropdown (e.g., while loading).

#### Example:

```tsx
<SelectField
  id="currency"
  label="Currency"
  options={[
    { value: "NGN", label: "Nigerian Naira (NGN)" },
    { value: "KES", label: "Kenyan Shilling (KES)", disabled: true },
    { value: "GHS", label: "Ghanaian Cedi (GHS)", disabled: true },
  ]}
  defaultValue="NGN"
  formMethods={formMethods}
  validation={{ required: "Currency is required" }}
  error={errors.currency}
/>
```

## Validation Rules

### TransactionForm

- **Amount:** Must be a valid number between 0.5 and 500 USDC, with up to four decimal places.
- **Currency:** Required, and must be one of the supported currencies (NGN, KES, GHS).

### SelectField

- **Required Validation:** The select input can have a required validation rule that ensures the user selects an option.

## Customization

To customize the form fields or extend the functionality:

1. Modify the currency options:

   - In the `TransactionForm` component, edit the `currencies` array to add or remove supported currencies.

2. Update validation rules:

   - In the `TransactionForm`, modify the `validation` object passed to `register` to add custom validation rules for the form inputs.

3. Add new fields:
   - Add new inputs to the form in `TransactionForm.tsx`, register them using `react-hook-form`, and update the submission logic.

## Contributing

We welcome contributions! To contribute:

1. Fork this repository.
2. Create a new branch for your feature or bugfix (`git checkout -b feature-name`).
3. Make your changes and test thoroughly.
4. Submit a pull request, and we’ll review it.

Please ensure your code adheres to the project's code style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


```
