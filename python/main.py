

scopes = ['User.Read']

# Multi-tenant apps can use "common",
# single-tenant apps must use the tenant ID from the Azure portal
tenant_id = 'd33825ec-0d14-4b50-ace0-deac0fa2f30d'

# Values from app registration
client_id = 'e34ab2ee-6985-48e8-878e-12e16dc0e3ac'

# azure.identity
credential = DeviceCodeCredential(
    tenant_id=tenant_id,
    client_id=client_id)

graph_client = GraphServiceClient(credential, scopes)