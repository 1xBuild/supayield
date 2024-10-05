use fuels::{prelude::*};
use fuels::types::{ContractId, Address, AssetId};
use fuels::types::Identity;

// Load abi from json
abigen!(Contract(
    name = "MyContract",
    abi = "out/debug/fuel-contracts-abi.json"
));

async fn get_contract_instance() -> (MyContract<WalletUnlocked>, ContractId) {
    // Launch a local network and deploy the contract
    let mut wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(1),             /* Single wallet */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await
    .unwrap();
    let wallet = wallets.pop().unwrap();

    let id = Contract::load_from(
        "./out/debug/fuel-contracts.bin",
        LoadConfiguration::default(),
    )
    .unwrap()
    .deploy(&wallet, TxPolicies::default())
    .await
    .unwrap();

    let instance = MyContract::new(id.clone(), wallet);

    (instance, id.into())
}

#[tokio::test]
async fn test_contract_deployment() {
    let (_instance, _id) = get_contract_instance().await;

    // Test that the contract ID is not zero
    assert_ne!(_id, ContractId::from([0u8; 32]));

    // Test that the instance has the correct contract ID
    assert_eq!(
        ContractId::from(_instance.contract_id()),
        _id
    );
}

#[tokio::test]
async fn test_deposit() {
    let (_instance, _id) = get_contract_instance().await;

    // Create a test identity and vault sub-id
    let receiver = Identity::Address(Address::from([0u8; 32]));
    let vault_sub_id = [0u8; 32];

    // Amount to deposit
    let deposit_amount = 100;

    // Prepare the call parameters
    let call_params = CallParameters::new(
        deposit_amount,
        AssetId::default(),
        1_000_000,
    );

    // Call the deposit function
    let result = _instance
        .methods()
        .deposit(receiver, fuels::types::Bits256(vault_sub_id))
        .call_params(call_params).expect("REASON")
        .call()
        .await
        .unwrap(); // FIXME: failed transfer to address

    // Check the result
    assert_eq!(result.value, deposit_amount, "The returned shares should equal the deposited amount when it's the first deposit");
}
