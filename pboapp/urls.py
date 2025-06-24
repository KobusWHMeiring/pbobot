from django.urls import path
from . import views

app_name = 'pboapp'

urlpatterns = [
    path('structure-selector/', views.structure_selector_view, name='structure_selector'),
    path('checklists/<str:checklist_type>/', views.structure_setup_view, name='structure_setup'),
    path('tools/generate/npc-moi/', views.generate_npc_moi_view, name='generate_npc_moi'),
    path('tools/preview/npc-moi/', views.preview_npc_moi_view, name='preview_npc_moi'),
]