import { test, expect } from '@grafana/plugin-e2e';

test('should display the provisioned buttons', async ({ gotoPanelEditPage, readProvisionedDashboard }) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  const panelEditPage = await gotoPanelEditPage({ dashboard, id: '1' });
  await expect(panelEditPage.panel.locator.getByRole('button', { name: 'Start' })).toBeVisible();
  await expect(panelEditPage.panel.locator.getByRole('button', { name: 'Stop' })).toBeVisible();
});

// Switches a provisioned placeholder panel instead of using the panelEditPage fixture, whose
// add-panel flow waits for a "Configure" button that Grafana 13.2+ doesn't always render.
test('should display a default button when the panel is newly added', async ({
  gotoPanelEditPage,
  readProvisionedDashboard,
}) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  const panelEditPage = await gotoPanelEditPage({ dashboard, id: '3' });
  await panelEditPage.setVisualization('Button Panel');
  await expect(panelEditPage.panel.locator.getByRole('button', { name: 'Button' })).toBeVisible();
});

test('should trigger the query and show a success notification on click', async ({
  gotoPanelEditPage,
  readProvisionedDashboard,
  page,
}) => {
  const dashboard = await readProvisionedDashboard({ fileName: 'dashboard.json' });
  const panelEditPage = await gotoPanelEditPage({ dashboard, id: '2' });
  await panelEditPage.panel.locator.getByRole('button', { name: 'Trigger' }).click();
  await expect(page.getByText(/Trigger: 200/)).toBeVisible();
});
