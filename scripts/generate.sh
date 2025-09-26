#!/bin/bash

PROTO_PATH=./proto
OUT_DIR=./src/proto
PRETTIER=./node_modules/.bin/prettier

FILES=$(find proto -type f -name "*.proto")

mkdir -p ${OUT_DIR}

echo "Generating TypeScript files from proto definitions..."
for x in ${FILES}; do
  protoc \
    --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_out="${OUT_DIR}" \
    --proto_path="${PROTO_PATH}" \
    --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages,useDate=false,snakeToCamel=false,emitDefaultValues=json-methods" \
    ${x}
done

echo "Prettifying generated files..."
if [ $? -eq 0 ]; then
  find ${OUT_DIR} -name "*.ts" -exec ${PRETTIER} --write {} +
fi
