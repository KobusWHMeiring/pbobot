from django.urls import path
from . import views

app_name = 'pboapp'

urlpatterns = [
    path('structure-selector/', views.structure_selector_view, name='structure_selector'),
    path('checklists/<str:checklist_type>/', views.structure_setup_view, name='structure_setup'),

    path('tools/generate/npc-moi/', views.generate_npc_moi_view, name='generate_npc_moi'),
    path('tools/preview/npc-moi/', views.preview_npc_moi_view, name='preview_npc_moi'),

    path('tools/generate/npc-cor14-1/', views.generate_npc_cor14_1_view, name='generate_npc_cor14_1'),
    path('tools/preview/npc-cor14-1/', views.preview_npc_cor14_1_view, name='preview_npc_cor14_1'),

    path('tools/generate/npc-cor9-1/', views.generate_npc_cor9_1_view, name='generate_npc_cor9_1'),
    path('tools/preview/npc-cor9-1/', views.preview_npc_cor9_1_view, name='preview_npc_cor9_1'),
]