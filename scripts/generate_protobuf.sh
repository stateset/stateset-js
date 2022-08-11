#!/bin/bash
set -o errexit -o nounset -o pipefail

SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

rm -rf "${SCRIPT_PATH}/StatesetNetwork"
git clone --depth 1 --branch v1.3.1 https://github.com/stateset/StatesetNetwork "${SCRIPT_PATH}/StatesetNetwork"

OUT_DIR="${SCRIPT_PATH}/../src/protobuf_stuff"
mkdir -p "$OUT_DIR"

PLUGIN_PATH="${SCRIPT_PATH}/../node_modules/.bin/protoc-gen-ts_proto"
TS_PROTO_OPTS="esModuleInterop=true,forceLong=string,useOptionals=true,useDate=false,lowerCaseServiceMethods=true,outputClientImpl=grpc-web"

# Path to this plugin, Note this must be an abolsute path on Windows
PLUGIN_PATH="${SCRIPT_PATH}/../node_modules/.bin/protoc-gen-ts_proto"

STATESET_DIR="${SCRIPT_PATH}/StatesetNetwork/proto"
STATESET_THIRD_PARTY_DIR="${SCRIPT_PATH}/StatesetNetwork/third_party/proto"

protoc \
  --plugin="protoc-gen-ts_proto=${PLUGIN_PATH}" \
  --ts_proto_out="${OUT_DIR}" \
  --ts_proto_opt="${TS_PROTO_OPTS}" \
  --proto_path="$STATESET_DIR" \
  --proto_path="$STATESET_THIRD_PARTY_DIR" \
  $(find ${STATESET_DIR} ${STATESET_THIRD_PARTY_DIR} -path -prune -o -name '*.proto' -print0 | xargs -0)

find "$OUT_DIR" -name '*.ts' | xargs -n 1 perl -i -pe 's/import _m0 from/import * as _m0 from/g'
