install:
	rm -rf target/wasm32v1-none/release/
	stellar contract build
	stellar contract install --network testnet --wasm target/wasm32v1-none/release/zafegard_policy.wasm --source default

bindings:
	stellar contract bindings typescript --network testnet --wasm target/wasm32v1-none/release/zafegard_policy.wasm --output-dir ./zafegard-policy-sdk__raw --overwrite