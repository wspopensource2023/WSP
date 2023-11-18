# from service.service import *
# from fastapi import (
#     Form,
#     Depends,
#     UploadFile,
#     HTTPException,
#     status,
#     Body,
#     APIRouter,
#     Request,
#     Response,
# )
# from dao.model import *
# from service.log import logger
#
# # 一旦关系的发起者更新了关系，关系的另一端就需要重新确认关系
# @router.post('/UpdateCreatedRelation', name="更新发起的关系（创建/删除）")
# def api_update_created_relation(
#         relation_name: str = Body(embed=True),
#         edge_account_id: str = Body(embed=True),
#         edge_relation_name: str = Body(embed=True),
#         state: bool = Body(embed=True),
#         account=Depends(get_current_account),
# ):
#     account_id = account.get('account_id')
#     if not account_id:
#         raise ERR_INVALID_SESSION
#     if account_id == edge_account_id:
#         raise Exception('can not link yourself')
#     timestamp = get_timestamp()
#     if not is_whitelist_relation(relation_name, edge_relation_name):
#         raise Exception('this relation is not supported')
#     if state:
#         is_mutual_exists = db.get_collection('relation').count_documents(
#             {'account_id': edge_account_id, 'edge_account_id': account_id,
#              'state': True, 'edge_state': True}
#         )
#         if is_mutual_exists:
#             raise Exception("mutual relationship already exists")
#     db.get_collection('relation').update_one(
#         {
#             'account_id': account_id,
#             'edge_account_id': edge_account_id,
#         },
#         get_mongodb_upsert_data({
#             'account_id': account_id,
#             'relation_name': relation_name,
#             'state': state,
#             'state_updated_at': timestamp,
#             'edge_account_id': edge_account_id,
#             'edge_relation_name': edge_relation_name,
#             'edge_state': False,
#             'edge_state_updated_at': timestamp,
#         }),
#         upsert=True
#     )
#     return Response({})
#
#
# @router.post('/UpdateReceivedRelation', name="更新收到的关系（创建/删除）")
# def api_update_received_relation(
#         creator_account_id: str = Body(embed=True),
#         creator_relation_name: str = Body(embed=True),
#         received_relation_name: str = Body(embed=True),
#         state: bool = Body(embed=True),
#         account=Depends(get_current_account),
# ):
#     account_id = account.get('account_id')
#     if not account_id:
#         raise ERR_INVALID_SESSION
#     if account_id == creator_account_id:
#         raise Exception('can not link yourself')
#     if state:
#         is_mutual_exists = db.get_collection('relation').count_documents(
#             {'account_id': account_id, 'edge_account_id': creator_account_id,
#              'state': True, 'edge_state': True}
#         )
#         if is_mutual_exists:
#             raise Exception("mutual relationship already exists")
#     timestamp = get_timestamp()
#     db.get_collection('relation').update_one(
#         {
#             'account_id': creator_account_id,
#             'relation_name': creator_relation_name,
#             'edge_account_id': account_id,
#             'edge_relation_name': received_relation_name,
#         },
#         {
#             "$set": {
#                 'edge_state': state,
#                 'edge_state_updated_at': timestamp,
#             }
#         }
#     )
#     return Response({})
#
#
# @router.post('/ListRelation', name="列举关系")
# def api_list_relation(
#         mutual: bool = Body(embed=True),
#         created_one_way: bool = Body(embed=True),
#         received_one_way: bool = Body(embed=True),
#         account=Depends(get_current_account),
# ):
#     account_id = account.get('account_id')
#     if not account_id:
#         raise ERR_INVALID_SESSION
#     items = list_relation(
#         account_id,
#         mutual,
#         created_one_way,
#         received_one_way,
#     )
#     return Response(items)
#
#
# def list_relation(
#         account_id: str,
#         mutual: bool = False,
#         created_one_way: bool = False,
#         received_one_way: bool = False,
# ):
#     conditions = []
#     if mutual:
#         conditions.append({
#             'account_id': account_id,
#             'state': True,
#             'edge_state': True,
#         })
#         conditions.append({
#             'edge_account_id': account_id,
#             'state': True,
#             'edge_state': True,
#         })
#     if created_one_way:
#         conditions.append({
#             'account_id': account_id,
#             'state': True,
#             'edge_state': False,
#         })
#     if received_one_way:
#         conditions.append({
#             'edge_account_id': account_id,
#             'state': True,
#             'edge_state': False,
#         })
#     cursor = db.get_collection('relation').find(
#         {
#             "$or": conditions,
#         }
#     )
#     if not cursor:
#         return []
#     items = [item for item in cursor]
#     delete_fields(items, ['_id'])
#     return items
#
# def delete_fields(items, fields):
#     for item in items:
#         for field in fields:
#             del item[field]
