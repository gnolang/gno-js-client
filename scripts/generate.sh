#!/bin/bash

PROTO_PATH=./proto
OUT_DIR=./src/proto
PRETTIER=./node_modules/.bin/prettier

FILES=$(find proto -type f -name "*.proto")

mkdir -p ${OUT_DIR}

for x in ${FILES}; do
  protoc \
    --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_out="${OUT_DIR}" \
    --proto_path="${PROTO_PATH}" \
    --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages,useDate=false,snakeToCamel=false,emitDefaultValues=json-methods" \
    ${x}
done

# Apply amino JSON compatibility changes to patch proto generated files.
# Patch fixes two issues:
# - Empty `max_deposit` is represented in JSON as an empty string in proto while omitted completely in Amino JSON
# - Empty `google.protobuf.Any` fields are omitted in proto JSON while explicitly set to null in Amino JSON
#
# See:
#   https://github.com/gnolang/gno-js-client/pull/184
#   https://github.com/gnolang/gno-js-client/pull/46
#
# This is a short term solution that potentially requires maintaining the patch updated.
if [ $? -eq 0 ]; then
  # First prettify generated code to allow the patch to be applied
  ${PRETTIER} --write ${OUT_DIR}/gno/bank.ts ${OUT_DIR}/gno/vm.ts && \
  git apply ./scripts/amino-json-compatibility.patch
fi
