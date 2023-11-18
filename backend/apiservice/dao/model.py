import enum

from pydantic import BaseModel, validator
from typing import List, Dict
import json


class BaseModelX(BaseModel):
    class Config:
        arbitrary_types_allowed = True

    def dict(self, *args, **kwargs):
        kwargs.pop('exclude_none', True)
        kwargs.pop('exclude_unset', True)
        return super().dict(*args, **kwargs, exclude_none=True, exclude_unset=True)


class CRD(BaseModel):
    class Kind(enum.Enum):
        Profile = "Profile"
        Group = "Group"
        SBT = "SBT"
        Title = "Title"
        Story = "Story"
        Link = "Link"
        XiaoHongShu = "XiaoHongShu"
        Bilibili = "Bilibili"
        Weibo = "Weibo"
        ZhiHu = "ZhiHu"
        AchievementCollected = "AchievementCollected"
        AchievementIssued = "AchievementIssued"
        
    apiVersion: str
    kind: Kind
    spec: dict

    @validator("spec")
    def parse_spec(cls, value, values, config, field):
        kind = values.get('kind')
        if kind == CRD.Kind.Group:
            return GroupCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.Title:
            return TitleCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.Link:
            return LinkCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.Story:
            return StoryCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.SBT:
            return SBTCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.XiaoHongShu:
            return XiaoHongShuCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.Bilibili:
            return BilibiliCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.Weibo:
            return WeiboCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.ZhiHu:
            return ZhiHuCRD.Spec.parse_obj(value)
        if kind == CRD.Kind.Profile:
            return ProfileCRD.Spec.parse_obj(value)
        return {}


class ProfileCRD(CRD):
    class Spec(BaseModel):
        accountId: str = ""
        profileId: str = ""
        title: str = ""
        avatar: str = ""
        description: str = ""
        slug: str = ""
        identity: str = ""
        style: dict = {}
        children: List[CRD]

    spec: Spec


class GroupCRD(CRD):
    class Spec(BaseModel):
        visible: bool = True
        style: dict = {}
        children: List[CRD]

    spec: Spec


class TitleCRD(CRD):
    class Spec(BaseModel):
        title: str = ''
        subtitle: str = ''
        visible: bool = True
        style: dict = {}

    spec: Spec


class SBTCRD(CRD):
    class Spec(BaseModel):
        layout: str = ''
        visible: bool = True
    spec: Spec

class AchievementCollectedCRD(CRD):
    class Spec(BaseModel):
        visible: bool = True
    spec: Spec


class AchievementIssuedCRD(CRD):
    class Spec(BaseModel):
        visible: bool = True
    spec: Spec


class LinkCRD(CRD):
    class Spec(BaseModel):
        title: str = ''
        visible: bool = True
        icon: str = ''
        subtitle: str = ''
        style: dict = {}
        url: str = ''

    spec: Spec


class StoryCRD(CRD):
    class Spec(BaseModel):
        title: str = ''
        visible: bool = True
        icon: str = ''
        subtitle: str = ''
        content: str
        style: dict = {}

    spec: Spec


class BilibiliCRD(CRD):
    class Spec(BaseModel):
        uid: str = ''
        title: str = ''
        visible: bool = True
        icon: str = ''
        subtitle: str = ''
        url: str = ''
        style: dict = {}

    spec: Spec


class WeiboCRD(CRD):
    class Spec(BaseModel):
        uid: str = ''
        title: str = ''
        visible: bool = True
        icon: str = ''
        subtitle: str = ''
        url: str = ''
        style: dict = {}

    spec: Spec


class XiaoHongShuCRD(BaseModel):
    class Spec(BaseModel):
        uid: str = ''
        title: str = ''
        visible: bool = True
        icon: str = ''
        subtitle: str = ''
        url: str = ''
        style: dict = {}

    spec: Spec


class ZhiHuCRD(BaseModel):
    class Spec(BaseModel):
        uid: str = ''
        title: str = ''
        visible: bool = True
        icon: str = ''
        subtitle: str = ''
        url: str = ''
        style: dict = {}

    spec: Spec


def print_vars_tree(obj, indent=0):
    """递归打印vars()返回的对象树"""
    if isinstance(obj, dict):
        for k, v in obj.items():
            print("{}{}:".format(" " * indent, k))
            print_vars_tree(v, indent + 2)
    elif isinstance(obj, object):
        for k, v in vars(obj).items():
            print("{}{}:".format(" " * indent, k))
            print_vars_tree(v, indent + 2)
    else:
        print("{}{}".format(" " * indent, obj))


# from prettyprinter import pprint

# profile_dict = json.loads(raw)
# crd = ProfileCRD.parse_obj(profile_dict)

# pprint(crd, indent=4)
# print_vars_tree(vars(crd))
