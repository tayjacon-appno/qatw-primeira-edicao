import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginActions } from '../actions/LoginActions';
import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis';

const usuario = { cpf: '00000014141', senha: '147258' };

test('Deve acessar a conta do usuário', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  await cleanJobs();

  await loginPage.acessaPagina();
  await loginPage.informaCPF(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);
  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({timeout: 3000});

  // const code = await obterCodigo2FA();
  const codigo = await getJob();

  await loginPage.infrom2FA(codigo);
  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00');
});

test('Deve acessar a conta do usuário 2', async ({ page }) => {
  const loginActions = new LoginActions(page);
  await loginActions.acessaPagina();
  await loginActions.informaCPF(usuario.cpf);
  await loginActions.informaSenha(usuario.senha);
  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({timeout: 3000});
  const code = await obterCodigo2FA();
  await loginActions.infrom2FA(code);
  await expect(await loginActions.obterSaldo()).toHaveText('R$ 5.000,00');
});

test('Não deve logar quando o códgo de autenticação for inválido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.acessaPagina();
  await loginPage.informaCPF(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);
  await loginPage.infrom2FA('123456');
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente');
});