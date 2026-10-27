export const rolesUser = [
  { label: 'Administrador', value: 'ADMIN' },
  { label: 'Vendedor', value: 'SALES' },
  { label: 'Gerente', value: 'MANAGER' },
]

// Usuarios de prueba que se muestran en el login cuando VITE_DEMO_PASSWORD está definida
export const demoUsers = [
  {
    label: 'Entrar como vendedor',
    description: 'Registra ventas y compras, y consulta productos.',
    email: 'ventas@qwerty.com',
  },
  {
    label: 'Entrar como gerente',
    description: 'Además gestiona productos, proveedores y usuarios.',
    email: 'gerente@qwerty.com',
  },
]
