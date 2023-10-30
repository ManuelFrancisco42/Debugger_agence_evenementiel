import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


// Test 1:  Here I am checking  if the Home page displays services, events, and people sections
test('Home page displays services, events, and people sections', () => {
  render(<Home />); // Render the Home component

  // Here I am  checking  if the "Services" section is displayed
  const servicesSection = screen.getByRole('heading', { name: 'Nos services' });
  expect(servicesSection).toBeInTheDocument();

  //  Here I am checking  if the "Realizations" section is displayed
  const realisationsSection = screen.getByRole('heading', {
    name: 'Nos réalisations',
  });
  expect(realisationsSection).toBeInTheDocument();

  //  Here I am checking  if the "Our Team" section is displayed
  const peopleSection = screen.getByRole('heading', { name: 'Notre équipe' });
  expect(peopleSection).toBeInTheDocument();
});

// Test 2:  Here I am checking  if the Home page displays the last event card when available
test('Home page displays the last event card', () => {
  // Mock the lastEvent data
  const mockLastEvent = {
    title: 'Sample Event',
    cover: '/sample-event-image.jpg',
    date: '2023-10-31',
  };

  jest.mock('../../contexts/DataContext', () => ({
    useData: () => ({
      lastEvent: mockLastEvent,
    }),
  }));

  render(<Home />); // Render the Home component

  //  Here I am checking  if the last event card is displayed
  const lastEventCard = screen.getByTestId('last-event');
  expect(lastEventCard).toBeInTheDocument();
});

// Test 3: Here I am  checking  if the Home page displays contact information in the footer
test('Home page displays contact information in the footer', () => {
  render(<Home />); // Render the Home component

  // Here I am  checking  if the footer displays the address
  const address = screen.getByText('45 avenue de la République, 75000 Paris');
  expect(address).toBeInTheDocument();

  //  Here I am checking  if the footer displays the phone number
  const phone = screen.getByText('01 23 45 67 89');
  expect(phone).toBeInTheDocument();

  //  Here I am checking  if the footer displays the email address
  const email = screen.getByText('contact@77events.com');
  expect(email).toBeInTheDocument();
});

